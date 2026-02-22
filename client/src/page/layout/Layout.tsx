import { useState } from "react";
import { CURRENT_SONG, MOCK_ARTISTS, NEXT_SONG } from "../../util/Artist";
import { Outlet } from "react-router-dom";
import FollowingArtistSidebar from "../../component/sidebar/FollowingArtistSidebar";
import Header from "../../component/header/Header";
import PlayerFooter from "../../component/footer/PlayerFooter";
import NowPlayingRail from "../../component/sidebar/NowPlayingRail";
import NowPlayingPanel from "../../component/sidebar/NowPlayingPanel";

export default function Layout() {
    const [isNowPlayingCollapsed, setIsNowPlayingCollapsed] = useState(true);
    const [isFollowingArtistSidebarExpanded, setIsFollowingArtistSidebarExpanded] = useState(false);

    return (
        <div className="flex flex-col h-screen w-full overflow-hidden bg-black text-white">
            <Header />

            <div className="flex flex-1 min-h-0 overflow-hidden relative">
                <FollowingArtistSidebar
                    isExpanded={isFollowingArtistSidebarExpanded}
                    setIsExpanded={setIsFollowingArtistSidebarExpanded}
                />

                <main
                    className={`
                        min-h-0 overflow-y-auto bg-[#121212] transition-all duration-300
                        ${isFollowingArtistSidebarExpanded ? 'w-0 flex-none opacity-0 invisible' : 'flex-1 opacity-100 visible'} 
                    `}
                >
                    <div className="max-w-[1400px] mx-auto h-full p-4">
                        <Outlet />
                    </div>
                </main>

                <aside
                    className={`
                        h-full border-l border-white/10 transition-all duration-300 ease-in-out flex-shrink-0
                        ${isNowPlayingCollapsed ? 'w-[300px] xl:w-[350px] 2xl:w-[400px]' : 'w-[60px]'}
                        ${isFollowingArtistSidebarExpanded ? 'hidden md:flex' : 'flex'}
                    `}
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