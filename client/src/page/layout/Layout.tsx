import { useState, useEffect } from "react";
import { CURRENT_SONG, MOCK_ARTISTS, NEXT_SONG } from "../../util/Artist";
import { Outlet } from "react-router-dom";
import FollowingArtistSidebar from "../../component/sidebar/FollowingArtistSidebar";
import Header from "../../component/header/Header";
import PlayerFooter from "../../component/footer/PlayerFooter";
import NowPlayingRail from "../../component/sidebar/NowPlayingRail";
import NowPlayingPanel from "../../component/sidebar/NowPlayingPanel";
import { DEFAULT_LEFT_WIDTH, DEFAULT_RIGHT_WIDTH, MAX_LEFT_WIDTH, MAX_RIGHT_WIDTH, MEDIUM_SCREEN, MIN_LEFT_WIDTH, MIN_RIGHT_WIDTH, SMALL_SCREEN } from "../../util/Size";

export default function Layout() {
    const [screenWidth, setScreenWidth] = useState(() => window.innerWidth)
    //Left sidebar
    const [isFollowingArtistSidebarExpanded, setIsFollowingArtistSidebarExpanded] = useState(false);
    const [isLeftDragging, setIsLeftDragging] = useState(false);
    const [leftWidth, setLeftWidth] = useState(() =>
        window.innerWidth < SMALL_SCREEN ? MIN_LEFT_WIDTH : DEFAULT_LEFT_WIDTH
    );

    const [isLeftCollapsed, setIsLeftCollapsed] = useState(() =>
        window.innerWidth < SMALL_SCREEN
    );

    //Right sidebar
    const [rightWidth, setRightWidth] = useState(() =>
        window.innerWidth < MEDIUM_SCREEN ? MIN_RIGHT_WIDTH : DEFAULT_RIGHT_WIDTH
    );

    const [isNowPlayingCollapsed, setIsNowPlayingCollapsed] = useState(() =>
        window.innerWidth >= MEDIUM_SCREEN
    );
    const [isRightDragging, setIsRightDragging] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const handleScreenWidth = () => {
            if (screenWidth < SMALL_SCREEN) {
                setLeftWidth(MIN_LEFT_WIDTH);
                setIsLeftCollapsed(true);
                setIsFollowingArtistSidebarExpanded(false);
            } else {
                setLeftWidth(DEFAULT_LEFT_WIDTH);
                setIsLeftCollapsed(false);
            }

            // RIGHT SIDEBAR
            if (screenWidth < MEDIUM_SCREEN) {
                setRightWidth(MIN_RIGHT_WIDTH);
                setIsNowPlayingCollapsed(false);
            } else {
                setRightWidth(DEFAULT_RIGHT_WIDTH);
                setIsNowPlayingCollapsed(true);
            }
        }

        handleScreenWidth()
    }, [screenWidth]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isLeftDragging) {
                const newWidth = e.clientX;

                if (newWidth < MIN_LEFT_WIDTH * 3) {
                    setIsLeftCollapsed(true);
                    setIsFollowingArtistSidebarExpanded(false);
                    setLeftWidth(MIN_LEFT_WIDTH);
                } else if (newWidth > MAX_LEFT_WIDTH) {
                    setIsLeftCollapsed(false);
                    setIsFollowingArtistSidebarExpanded(true);
                    setLeftWidth(newWidth);
                } else {
                    setIsLeftCollapsed(false);
                    setIsFollowingArtistSidebarExpanded(false);
                    setLeftWidth(newWidth);
                }
            }

            if (isRightDragging) {
                const newWidth = window.innerWidth - e.clientX;

                if (newWidth < MIN_RIGHT_WIDTH) {
                    setIsNowPlayingCollapsed(false);
                } else {
                    setIsNowPlayingCollapsed(true);
                    setRightWidth(newWidth > MAX_RIGHT_WIDTH ? MAX_RIGHT_WIDTH : newWidth);
                }
            }
        };

        const handleMouseUp = () => {
            setIsLeftDragging(false);
            setIsRightDragging(false);
            document.body.style.cursor = 'default';
        };

        if (isLeftDragging || isRightDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            document.body.style.userSelect = 'none';
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.body.style.userSelect = 'auto';
        };
    }, [isLeftDragging, isRightDragging]);

    return (
        <div className="flex flex-col h-screen w-full overflow-hidden bg-black text-white">
            <Header />

            <div className="flex flex-1 min-h-0 overflow-hidden relative md:gap-x-1">
                <div
                    className="shrink-0 rounded-t-lg overflow-hidden bg-[#121212] transition-none"
                    style={{ width: isFollowingArtistSidebarExpanded ? '97%' : leftWidth }}
                >
                    <FollowingArtistSidebar
                        isExpanded={isFollowingArtistSidebarExpanded}
                        setIsExpanded={setIsFollowingArtistSidebarExpanded}
                        isCollapsed={isLeftCollapsed}
                        setIsCollapsed={setIsLeftCollapsed}
                        setLeftWidth={setLeftWidth}
                    />
                </div>

                {!isFollowingArtistSidebarExpanded && (
                    <div
                        className="w-1 cursor-col-resize hover:bg-white/50 hover:w-1.5 transition-all z-10 hidden md:block"
                        onMouseDown={() => {
                            setIsLeftDragging(true);
                            document.body.style.cursor = 'col-resize';
                        }}
                    />
                )}

                <main
                    className={` 
                        flex-1 min-h-0 bg-[#121212]
                        overflow-y-auto overflow-x-hidden
                        transition-all duration-300
                        scrollbar-hover lg:rounded-t-lg
                        ${isFollowingArtistSidebarExpanded ? 'w-0 flex-none opacity-0 invisible' : 'flex-1 opacity-100 visible'} 
                    `}
                >
                    <div className="max-w-[1400px] mx-auto h-full rounded-lg">
                        <Outlet />
                    </div>
                </main>

                {!isFollowingArtistSidebarExpanded && isNowPlayingCollapsed && (
                    <div
                        className="w-1 cursor-col-resize hover:bg-white/50 hover:w-1.5 transition-all z-10 hidden md:block"
                        onMouseDown={() => {
                            setIsRightDragging(true);
                            document.body.style.cursor = 'col-resize';
                        }}
                    />
                )}

                <aside
                    className={`
                        h-full ease-in-out flex-shrink-0 hidden md:flex
                        ${isFollowingArtistSidebarExpanded ? 'hidden md:flex' : 'flex'}
                    `}
                    style={{
                        width: isNowPlayingCollapsed ? rightWidth : "2%",
                        transition: isRightDragging ? 'none' : 'width 0.3s'
                    }}
                >
                    {isNowPlayingCollapsed ? (
                        <NowPlayingPanel
                            isOpen={isNowPlayingCollapsed}
                            onClose={() => setIsNowPlayingCollapsed(false)}
                            artists={MOCK_ARTISTS}
                            currentSong={CURRENT_SONG}
                            nextInQueue={NEXT_SONG}
                        />
                    ) : (
                        <NowPlayingRail onOpen={() => setIsNowPlayingCollapsed(true)} />
                    )}
                </aside>
            </div>

            <div className="shrink-0 z-50">
                <PlayerFooter />
            </div>
        </div>
    );
}