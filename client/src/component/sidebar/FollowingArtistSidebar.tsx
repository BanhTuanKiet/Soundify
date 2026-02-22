import { useEffect, useState } from 'react';
import { Library, Plus, Search, List, Heart, X, Maximize2, Minimize2 } from 'lucide-react';
import { followingArtists } from '../../util/Artist.ts'
import { useNavigate } from 'react-router-dom';
import type { ActiveArtistState } from '../../model/Artist.tsx';
import FollowingArtistCard from '../card/FollowingArtistCard.tsx';

type FollowingArtistSidebarProps = {
    isExpanded: boolean
    setIsExpanded: (isExpanded: boolean) => void
}

const FollowingArtistSidebar = ({ isExpanded, setIsExpanded }: FollowingArtistSidebarProps) => {
    const [activeArtist, setActiveArtist] = useState<ActiveArtistState | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsCollapsed(true);
                setIsExpanded(false);
            } else {
                setIsCollapsed(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    const filteredArtists = followingArtists.filter(artist =>
        artist?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    flex flex-col
                    transition-all duration-300 ease-in-out z-50
                    fixed top-0 left-0 md:relative  h-full
                    ${isCollapsed
                        ? '-translate-x-full md:translate-x-0 md:w-20 shrink-0'
                        : isExpanded
                            ? 'translate-x-0 w-full md:flex-1'
                            : 'translate-x-0 w-[80%] sm:w-[50%] md:w-[280px] lg:w-[350px] shrink-0'
                    }
                `}
            >
                <div className="p-4 pb-2 sticky top-0 bg-[#121212] z-10 rounded-t-lg shrink-0">
                    <div className={`flex items-center ${isCollapsed ? 'justify-center flex-col gap-4' : 'justify-between'}`}>
                        <button
                            onClick={toggleSidebar}
                            className="flex items-center gap-2 hover:text-white transition-colors group"
                            title="Toggle Library"
                        >
                            <Library size={28} />
                            {!isCollapsed && <span className="font-bold text-base whitespace-nowrap">Your Library</span>}
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
                                <button
                                    onClick={toggleExpand}
                                    className="hidden md:flex hover:bg-[#2a2a2a] p-2 rounded-full hover:text-white transition"
                                    title={isExpanded ? "Collapse Library" : "Expand Library"}
                                >
                                    {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
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

                <div className="flex-1 overflow-y-hidden hover:overflow-y-auto scrollbar-hover px-2 pb-4">
                    {!isCollapsed && (
                        <div className="px-2 py-2 flex items-center h-12 gap-2 overflow-hidden">
                            <div className="relative flex-1 min-w-0">
                                <div
                                    className={`
                                        absolute left-0 top-1/2 -translate-y-1/2
                                        flex items-center gap-2
                                        bg-[#2a2a2a]
                                        rounded-md px-2 py-1.5
                                        w-full
                                        transition-all duration-300 ease-out
                                        origin-left
                                        ${isSearchOpen || isExpanded
                                            ? 'opacity-100 translate-x-0 scale-x-100 pointer-events-auto'
                                            : 'opacity-0 -translate-x-4 scale-x-95 pointer-events-none'
                                        }
                                    `}
                                >
                                    <Search size={18} className="text-[#b3b3b3] shrink-0" />

                                    <input
                                        type="text"
                                        placeholder="Search in Your Library"
                                        className="flex-1 min-w-0 bg-transparent text-white text-sm focus:outline-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus={isSearchOpen && !isExpanded}
                                    />

                                    <X
                                        size={16}
                                        className="cursor-pointer text-[#b3b3b3] hover:text-white shrink-0"
                                        onClick={() => {
                                            setIsSearchOpen(false);
                                            setSearchQuery('');
                                        }}
                                    />
                                </div>

                                {!isSearchOpen && !isExpanded && (
                                    <button
                                        className="p-2 rounded-full hover:bg-[#2a2a2a] hover:text-white transition-all"
                                        onClick={() => setIsSearchOpen(true)}
                                    >
                                        <Search size={18} />
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-1 text-sm hover:text-white cursor-pointer hover:scale-105 transition-transform shrink-0">
                                <span>Recents</span>
                                <List size={18} />
                            </div>
                        </div>
                    )}

                    <div className={
                        isExpanded
                            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 px-2 pt-2"
                            : "space-y-1"
                    }>

                        <div
                            onClick={() => navigate(`/playlist`)}
                            className={`
                                cursor-pointer group transition-colors
                                ${isExpanded
                                    ? 'flex flex-col gap-4 p-4 bg-[#181818] hover:bg-[#282828] rounded-md'
                                    : 'flex items-center gap-3 p-2 hover:bg-[#1f1f1f] rounded-md'
                                }
                                ${isCollapsed && !isExpanded ? 'justify-center' : ''}
                            `}
                        >
                            <div className={`
                                bg-gradient-to-br from-[#450af5] to-[#c4efd9] rounded-md flex items-center justify-center text-white shadow-lg shrink-0
                                ${isExpanded ? 'w-full aspect-square' : 'w-12 h-12 min-w-[48px]'}
                            `}>
                                <Heart size={isExpanded ? 64 : 20} fill="white" />
                            </div>

                            {!isCollapsed && (
                                <div className={`overflow-hidden ${isExpanded ? 'w-full' : ''}`}>
                                    <h4 className={`text-white font-medium truncate ${isExpanded ? 'text-base mb-1' : ''}`}>Liked Songs</h4>
                                    <p className="text-sm truncate text-[#9ca3af]">📌 Playlist • 27 songs</p>
                                </div>
                            )}
                        </div>

                        {filteredArtists.map((artist) => {
                            const isActive = activeArtist?.id == artist?.id && activeArtist.isActive;

                            return (
                                <FollowingArtistCard
                                    key={artist.id}
                                    artist={artist}
                                    activeArtist={activeArtist}
                                    setActiveArtist={setActiveArtist}
                                    isActive={isActive}
                                    isCollapsed={isCollapsed}
                                    isExpanded={isExpanded}
                                />
                            );
                        })}

                        {filteredArtists.length === 0 && (
                            <div className="text-center p-4 text-sm col-span-full">
                                No results found for "{searchQuery}"
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default FollowingArtistSidebar;