import { useEffect, useState } from 'react';
import { Library, Plus, Search, List, ArrowRight, Heart, X } from 'lucide-react';
import { followingArtists } from '../../util/Artist.ts'
import { useNavigate } from 'react-router-dom';
import type { ActiveArtistState } from '../../model/Artist.tsx';
import FollowingArtist from '../card/FollowingArtist.tsx';

const HomeSidebar = () => {
    const [activeArtist, setActiveArtist] = useState<ActiveArtistState | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    return (
        <>
            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity"
                    onClick={() => setIsCollapsed(true)}
                />
            )}

            <aside
                className={`
                bg-[#1a1a1a] text-[#b3b3b3] flex flex-col
                transition-all duration-300 ease-in-out z-50
                fixed top-0 left-0 md:relative md:rounded-lg h-full
                ${isCollapsed
                        ? '-translate-x-full md:translate-x-0 md:w-20'
                        : 'translate-x-0 w-4/5 sm:w-1/2 md:w-[23.5%] md:min-w-[260px]'
                    }
            `}
            >
                <div className="p-4 pb-2 sticky top-0 bg-[#1a1a1a] z-10 rounded-t-lg shrink-0">
                    <div className={`flex items-center ${isCollapsed ? 'justify-center flex-col gap-4' : 'justify-between'}`}>
                        <button
                            onClick={toggleSidebar}
                            className="flex items-center gap-2 hover:text-white transition-colors group"
                            title="Toggle Library"
                        >
                            <Library size={28} />
                            {!isCollapsed && <span className="font-bold text-base">Your Library</span>}
                        </button>

                        <div className={`flex items-center gap-2 ${isCollapsed ? 'flex-col' : ''}`}>
                            {!isCollapsed && (
                                <button
                                    className="md:hidden hover:bg-[#2a2a2a] p-2 rounded-full hover:text-white transition"
                                    onClick={() => setIsCollapsed(true)}
                                >
                                    <X size={20} />
                                </button>
                            )}
                            <button className="hidden md:flex hover:bg-[#2a2a2a] p-2 rounded-full hover:text-white transition">
                                <Plus size={20} />
                            </button>
                            {!isCollapsed && (
                                <button className="hidden md:flex hover:bg-[#2a2a2a] p-2 rounded-full hover:text-white transition">
                                    <ArrowRight size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    {!isCollapsed && (
                        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
                            <span className="bg-[#2a2a2a] px-3 py-1 rounded-full text-sm text-white cursor-pointer hover:bg-[#3a3a3a] whitespace-nowrap">
                                Playlists
                            </span>
                            <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap">
                                Artists
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-y-hidden hover:overflow-y-auto scrollbar-hover px-2">
                    {!isCollapsed && (
                        <div className="px-2 py-2 flex justify-between items-center">
                            <button className="hover:bg-[#2a2a2a] p-2 rounded-full hover:text-white transition-colors">
                                <Search size={18} />
                            </button>
                            <div className="flex items-center gap-1 text-sm hover:text-white cursor-pointer hover:scale-105 transition-transform pr-1">
                                <span>Recents</span>
                                <List size={18} />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <div
                            onClick={() => navigate(`/playlist`)}
                            className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#1f1f1f] cursor-pointer group ${isCollapsed ? 'justify-center' : ''}`}>
                            <div className="w-12 h-12 min-w-[48px] bg-gradient-to-br from-[#450af5] to-[#c4efd9] rounded-md flex items-center justify-center text-white shadow-lg">
                                <Heart size={20} fill="white" />
                            </div>
                            {!isCollapsed && (
                                <div className="overflow-hidden" >
                                    <h4 className="text-white font-medium truncate">Liked Songs</h4>
                                    <p className="text-sm truncate text-[#9ca3af]">📌 Playlist • 7 songs</p>
                                </div>
                            )}
                        </div>

                        {followingArtists.map((artist) => {
                            const isActive = activeArtist?.id == artist?.id && activeArtist.isActive;

                            return (
                                <FollowingArtist
                                    artist={artist}
                                    activeArtist={activeArtist}
                                    setActiveArtist={setActiveArtist}
                                    isActive={isActive}
                                    isCollapsed={isCollapsed}
                                />
                            );
                        })}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default HomeSidebar;