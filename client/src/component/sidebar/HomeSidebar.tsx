import { useEffect, useState } from 'react';
import { Library, Plus, Search, List, ArrowRight, Heart, Play, Pause, X, Volume1 } from 'lucide-react';
import { artistsData } from '../../util/Artist.ts'

const HomeSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeArtistId, setActiveArtistId] = useState(3);

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
                    bg-[#121212] h-screen text-[#b3b3b3] flex flex-col
                    transition-all duration-300 ease-in-out z-50
                    fixed top-0 left-0 md:relative md:rounded-lg
                    ${isCollapsed
                        ? '-translate-x-full md:translate-x-0 md:w-20'
                        : 'translate-x-0 w-4/5 sm:w-1/2 md:w-[23.5%] md:min-w-[260px]'
                    }
                `}
            >
                <div className="p-4 shadow-md sticky top-0 bg-[#121212] z-10 rounded-t-lg">
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

                {!isCollapsed && (
                    <div className="px-4 py-2 flex justify-between items-center">
                        <button className="hover:bg-[#2a2a2a] p-1 rounded-full hover:text-white">
                            <Search size={18} />
                        </button>
                        <div className="flex items-center gap-1 text-sm hover:text-white cursor-pointer hover:scale-105 transition-transform">
                            <span>Recents</span>
                            <List size={18} />
                        </div>
                    </div>
                )}

                <div className="
                    flex-1 overflow-y-hidden hover:overflow-y-auto p-2
                    scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-gray-600 scrollbar-track-transparent transition-all
                ">
                    <div className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer mb-2 group ${isCollapsed ? 'justify-center' : ''}`}>
                        <div className="w-12 h-12 min-w-[48px] bg-gradient-to-br from-[#450af5] to-[#c4efd9] rounded-md flex items-center justify-center text-white shadow-lg">
                            <Heart size={20} fill="white" />
                        </div>
                        {!isCollapsed && (
                            <div className="overflow-hidden">
                                <h4 className="text-white font-medium truncate">Liked Songs</h4>
                                <p className="text-sm truncate text-[#9ca3af]">📌 Playlist • 7 songs</p>
                            </div>
                        )}
                    </div>

                    {artistsData.map((artist) => {
                        const isActive = artist.id === activeArtistId;

                        return (
                            <div
                                key={artist.id}
                                onClick={() => setActiveArtistId(artist.id)}
                                className={`group relative flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}
                            >
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={artist.avatar}
                                        alt={artist.name}
                                        className={`w-12 h-12 rounded-full object-cover shadow-sm transition-all ${!isCollapsed && isActive ? 'opacity-100' : ''
                                            } ${!isCollapsed ? 'group-hover:opacity-50' : ''}`}
                                    />

                                    {!isCollapsed && (
                                        <div
                                            className="
                                                absolute inset-0 flex items-center justify-center rounded-full
                                                bg-black/40 opacity-0
                                                group-hover:opacity-100
                                                transition-opacity duration-200
                                            "
                                        >
                                            {isActive ? (
                                                <Pause
                                                    size={22}
                                                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity fill-current"
                                                />
                                            ) : (
                                                <Play
                                                    size={22}
                                                    className="text-white ml-1 fill-current"
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>

                                {!isCollapsed && (
                                    <div className="flex flex-1 items-center justify-between overflow-hidden">
                                        <div className="overflow-hidden pr-2">
                                            <h4 className={`font-medium truncate ${isActive ? 'text-[#1db954]' : 'text-white'}`}>{artist.name}</h4>
                                            <p className="text-sm text-[#9ca3af] truncate">Artist</p>
                                        </div>
                                        {isActive ? (
                                            <div className='overflow-hidden pr-2'>
                                                <Volume1 size={20} className="text-[#1db954] fill-current" />
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                )}

                                {isCollapsed && (
                                    <div className="absolute left-[80px] z-[60] hidden group-hover:flex flex-col bg-[#282828] px-3 py-2 rounded-md shadow-2xl whitespace-nowrap min-w-max pointer-events-none">
                                        <h4 className="font-semibold text-white text-[15px] leading-tight mb-0.5">{artist.name}</h4>
                                        <p className="text-sm text-[#a7a7a7]">Artist</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </aside>
        </>
    );
};

export default HomeSidebar;