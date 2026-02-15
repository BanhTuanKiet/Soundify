import { useEffect, useState } from 'react';
import { Library, Plus, Search, List, ArrowRight, Heart, Play, Pause, Volume2, X } from 'lucide-react';

const artistsData = [
    {
        id: 1,
        name: "Son Tung M-TP",
        bio: "Top V-Pop superstar...",
        avatar: "https://ui-avatars.com/api/?name=Son+Tung&background=random",
    },
    {
        id: 2,
        name: "Den Vau",
        bio: "Rapper with a simple, thoughtful style...",
        avatar: "https://ui-avatars.com/api/?name=Den+Vau&background=000&color=fff",
    },
    {
        id: 3,
        name: "Low G",
        bio: "A standout rapper from Rap Nha Lam...",
        avatar: "https://ui-avatars.com/api/?name=Low+G&background=ff0000&color=fff",
    },
    {
        id: 4,
        name: "tlinh",
        bio: "Talented Gen Z female rapper/singer...",
        avatar: "https://ui-avatars.com/api/?name=tlinh&background=pink&color=fff",
    },
    {
        id: 5,
        name: "Wren Evans",
        bio: "Versatile Gen Z artist...",
        avatar: "https://ui-avatars.com/api/?name=Wren+Evans&background=random",
    },
    {
        id: 6,
        name: "Da LAB",
        bio: "Popular Vietnamese music group...",
        avatar: "https://ui-avatars.com/api/?name=Da+LAB&background=random",
    },
    {
        id: 7,
        name: "Bui Truong Linh",
        bio: "Young singer-songwriter...",
        avatar: "https://ui-avatars.com/api/?name=Bui+Truong+Linh&background=random",
    },
    {
        id: 8,
        name: "Dat G",
        bio: "Singer-songwriter with many hit songs...",
        avatar: "https://ui-avatars.com/api/?name=Dat+G&background=random",
    },
    {
        id: 9,
        name: "AMEE",
        bio: "Female singer with a princess-like image...",
        avatar: "https://ui-avatars.com/api/?name=AMEE&background=pink&color=fff",
    },
    {
        id: 10,
        name: "B Ray",
        bio: "Rapper known for strong technical skills...",
        avatar: "https://ui-avatars.com/api/?name=B+Ray&background=random",
    },
    {
        id: 11,
        name: "Wxrdie",
        bio: "Talented young rapper...",
        avatar: "https://ui-avatars.com/api/?name=Wxrdie&background=random",
    },
    {
        id: 12,
        name: "Obito",
        bio: "Member of the OTĐ crew...",
        avatar: "https://ui-avatars.com/api/?name=Obito&background=random",
    },
    {
        id: 13,
        name: "Vu.",
        bio: "Indie pop prince...",
        avatar: "https://ui-avatars.com/api/?name=Vu&background=random",
    }
];

const HomeSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeArtistId, setActiveArtistId] = useState(3);

    // Xử lý Responsive tự động
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                // Tự động thu gọn trên Tablet & Mobile
                setIsCollapsed(true);
            } else {
                // Tự động mở rộng trên Màn hình lớn
                setIsCollapsed(false);
            }
        };

        // Kích hoạt ngay lần đầu render
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    return (
        <>
            {/* --- MOBILE OVERLAY --- */}
            {/* Lớp phủ màu đen xuất hiện trên mobile khi sidebar đang mở */}
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
                        ? '-translate-x-full md:translate-x-0 md:w-20' // Mobile: Ẩn hẳn (kéo sang trái) | Tablet/Desktop: Hiện bản thu nhỏ w-20
                        : 'translate-x-0 w-4/5 sm:w-1/2 md:w-1/4 md:min-w-[280px]' // Trượt ra trên Mobile | Kích thước chuẩn trên Desktop
                    }
                `}
            >
                {/* --- HEADER --- */}
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

                    {/* --- FILTER TAGS --- */}
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

                {/* --- SEARCH & SORT BAR --- */}
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

                {/* --- SCROLLABLE LIST --- */}
                <div className="
                    flex-1 overflow-y-hidden hover:overflow-y-auto p-2
                    scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-gray-600 scrollbar-track-transparent transition-all
                ">
                    {/* Liked Songs */}
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

                    {/* Artists list */}
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
                                        className={`w-12 h-12 rounded-full object-cover shadow-sm transition-all ${isActive && !isCollapsed ? 'opacity-50' : ''}`}
                                    />
                                    {!isCollapsed && isActive && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                                            <Pause size={22} fill="white" strokeWidth={0} className="text-white" />
                                        </div>
                                    )}
                                    {!isCollapsed && !isActive && (
                                        <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#1db954] flex items-center justify-center shadow-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out">
                                            <Play size={16} fill="black" className="ml-[1px] text-black" />
                                        </button>
                                    )}
                                </div>

                                {!isCollapsed && (
                                    <div className="flex flex-1 items-center justify-between overflow-hidden">
                                        <div className="overflow-hidden pr-2">
                                            <h4 className={`font-medium truncate ${isActive ? 'text-[#1db954]' : 'text-white'}`}>{artist.name}</h4>
                                            <p className="text-sm text-[#9ca3af] truncate">Artist</p>
                                        </div>
                                        {isActive && (
                                            <div className="flex-shrink-0 mr-1">
                                                <Volume2 size={20} className="text-[#1db954]" />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {isCollapsed && (
                                    <div className="absolute left-[85px] z-50 hidden group-hover:flex items-center gap-4 bg-[#282828] p-3 rounded-md shadow-2xl whitespace-nowrap min-w-[160px]">
                                        <div>
                                            <h4 className={`font-medium ${isActive ? 'text-[#1db954]' : 'text-white'}`}>{artist.name}</h4>
                                            <p className="text-sm text-[#9ca3af]">Artist</p>
                                        </div>
                                        {isActive && (
                                            <div className="ml-auto">
                                                <Volume2 size={20} className="text-[#1db954]" />
                                            </div>
                                        )}
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