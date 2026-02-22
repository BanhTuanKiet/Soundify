import { Clock, Heart, Play, Shuffle } from "lucide-react";

const mockPlaylistTracks = [
    {
        id: '1',
        title: 'Anh Tên Là',
        artists: 'Anh Bằng, 24k.Right, Nhism, Ann Nguyễn',
        album: 'Anh Tên Là',
        dateAdded: '3 ngày trước',
        duration: '3:06',
        imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=64&q=80',
        isExplicit: true,
    },
    {
        id: '2',
        title: 'Love Game',
        artists: 'Low G, tlinh',
        album: 'L2K',
        dateAdded: '3 ngày trước',
        duration: '3:19',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a1a2a5e560dd?auto=format&fit=crop&w=64&q=80',
        isExplicit: true,
    },
    {
        id: '3',
        title: 'Nhiều Hơn',
        artists: 'Low G',
        album: 'L2K',
        dateAdded: '3 ngày trước',
        duration: '3:05',
        imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=64&q=80',
        isExplicit: false,
    },
];

export default function Playlist() {
    const gridBase = 'grid-cols-[32px_1fr_40px]';
    const gridMd   = 'md:grid-cols-[32px_minmax(200px,4fr)_40px]'; 
    const gridLg   = 'lg:grid-cols-[32px_minmax(200px,4fr)_minmax(160px,3fr)_minmax(120px,2fr)_60px]'; 

    return (
        <div className="font-sans antialiased bg-[#0A1A2F] text-white selection:bg-[#1ed760] selection:text-black ">
            <div className="flex items-end gap-6 px-4 sm:px-6 md:px-8 py-10 md:py-12 bg-gradient-to-b from-[#1E2A5E] to-[#0A1A2F]/90">
                <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 shadow-2xl flex-shrink-0 bg-gradient-to-br from-[#450af5] to-[#c4efd9] flex items-center justify-center">
                    <Heart className="text-white w-16 h-16 md:w-20 md:h-20 drop-shadow-md" fill="white" />
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide">Playlist</span>

                    <h1 className="
                        text-3xl sm:text-5xl md:text-6xl xl:text-[6rem]
                        font-black tracking-tighter
                    ">
                        Liked Songs
                    </h1>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 font-bold">
                        <span className="text-white hover:underline cursor-pointer">
                            BanhTuanKiet
                        </span>
                        <span>• 14 Songs</span>
                    </div>
                </div>
            </div>

            <div className="px-4 sm:px-6 md:px-8 py-6 flex items-center gap-6">
                <button className="w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center hover:scale-105 transition shadow-lg shadow-black/40">
                    <Play fill="black" size={24} className="text-black ml-1" />
                </button>

                <button className="text-[#1ed760] hover:scale-105 transition-transform">
                    <Shuffle size={32} />
                </button>
            </div>

            <div className="px-4 sm:px-6 md:px-8 max-w-[1920px]">
                <div
                    className={`
                        grid ${gridBase} ${gridMd} ${gridLg}
                        px-1 py-2 text-gray-400 text-sm font-medium
                        border-b border-white/10 mb-2
                    `}
                >
                    <div className="text-center">#</div>
                    <div>Title</div>

                    <div className="hidden lg:block">Album</div>
                    <div className="hidden lg:block">Date added</div>

                    <div className="flex justify-center">
                        <Clock size={16} />
                    </div>
                </div>

                <div className="flex flex-col">
                    {mockPlaylistTracks.map((track, index) => (
                        <div
                            key={track.id}
                            className={`
                                grid ${gridBase} ${gridMd} ${gridLg}
                                gap-3 px-1 py-2 items-center
                                rounded-md hover:bg-white/10
                                group transition cursor-pointer font-bold
                            `}
                        >
                            <div className="text-gray-400 flex justify-center relative">
                                <span className="group-hover:invisible">{index + 1}</span>
                                <Play
                                    size={16}
                                    fill="currentColor"
                                    className="absolute text-white invisible group-hover:visible"
                                />
                            </div>

                            <div className="flex items-center gap-3 min-w-0">
                                <img
                                    src={track.imageUrl}
                                    alt={track.title}
                                    className="w-10 h-10 object-cover rounded shrink-0"
                                />

                                <div className="flex flex-col min-w-0">
                                    <span className="text-base font-medium truncate group-hover:underline">
                                        {track.title}
                                    </span>

                                    <div className="flex items-center gap-1.5 min-w-0">
                                        {track.isExplicit && (
                                            <span className="w-4 h-4 bg-white/60 text-black text-[9px] rounded-sm font-bold flex items-center justify-center">
                                                E
                                            </span>
                                        )}
                                        <span className="text-sm text-gray-400 truncate hover:underline font-normal">
                                            {track.artists}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden lg:block text-sm text-gray-400 truncate hover:underline">
                                {track.album}
                            </div>

                            <div className="hidden lg:block text-sm text-gray-400 truncate">
                                {track.dateAdded}
                            </div>

                            <div className="text-sm text-gray-400 text-center">
                                {track.duration}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}