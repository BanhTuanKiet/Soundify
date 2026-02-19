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
    const gridTemplate = 'grid-cols-[40px_minmax(200px,4fr)_minmax(150px,3fr)_minmax(120px,2fr)_60px]';

    return (
        <div className="min-h-screen font-sans antialiased bg-[#0A1A2F] text-white selection:bg-[#1ed760] selection:text-black">
            <div className="flex items-end gap-6 px-8 py-12 bg-gradient-to-b from-[#1E2A5E] to-[#0A1A2F]/90">
                <div className="w-56 h-56 shadow-2xl flex-shrink-0 bg-gradient-to-br from-[#450af5] to-[#c4efd9] flex items-center justify-center">
                    <Heart className="text-white w-20 h-20 drop-shadow-md" fill="white" />
                </div>

                <div className="flex flex-col gap-2 z-10">
                    <span className="text-sm font-bold">Playlist</span>
                    <h1 className="text-7xl md:text-[6rem] font-black tracking-tighter text-white mb-2">
                        Bài hát đã thích
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="font-bold text-white hover:underline cursor-pointer">
                            BanhTuanKiet
                        </span>
                        <span>• 14 bài hát</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#0A1A2F] min-h-screen">
                <div className="px-8 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-6 z-10">
                        <button className="w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-lg shadow-black/40 flex-shrink-0">
                            <Play fill="black" size={24} className="text-black ml-1" />
                        </button>
                        <button className="text-[#1ed760] hover:scale-105 transition-transform">
                            <Shuffle size={32} />
                        </button>
                    </div>

                    {/* <div className="text-gray-400 hover:text-white cursor-pointer flex items-center gap-2 text-sm font-bold transition-colors">
                        Danh sách <List size={20} />
                    </div> */}
                </div>

                <div className="px-8 mt-2 max-w-[1920px]">
                    <div
                        className={`grid ${gridTemplate} px-1 py-2 text-gray-400 text-sm font-medium border-b border-white/10 mb-2 uppercase tracking-wider`}
                    >
                        <div className="text-center">#</div>
                        <div>Title</div>
                        <div className="hidden md:block">Album</div>
                        <div className="hidden lg:block">Date added</div>
                        <div className="flex justify-center">
                            <Clock size={16} />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        {mockPlaylistTracks.map((track, index) => (
                            <div
                                key={track.id}
                                className={`grid ${gridTemplate} gap-4 px-1 py-2 items-center rounded-md hover:bg-white/10 group transition duration-200 cursor-pointer`}
                            >
                                <div className="text-gray-400 text-base font-medium flex justify-center relative">
                                    <span className="group-hover:invisible">{index + 1}</span>
                                    <Play
                                        size={16}
                                        fill="currentColor"
                                        className="absolute text-white invisible group-hover:visible"
                                    />
                                </div>

                                <div className="flex items-center gap-4 min-w-0">
                                    <img
                                        src={track.imageUrl}
                                        alt={track.title}
                                        className="w-10 h-10 object-cover rounded shrink-0"
                                    />
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-base font-medium text-white truncate group-hover:underline">
                                            {track.title}
                                        </span>

                                        <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                                            {track.isExplicit && (
                                                <span className="flex items-center justify-center w-4 h-4 bg-white/60 text-black text-[9px] rounded-sm font-bold shrink-0">
                                                    E
                                                </span>
                                            )}
                                            <span className="text-sm text-gray-400 truncate hover:underline hover:text-white transition-colors">
                                                {track.artists}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-400 truncate hidden md:block hover:underline hover:text-white transition-colors">
                                    {track.album}
                                </div>

                                <div className="text-sm text-gray-400 truncate hidden lg:block">
                                    {track.dateAdded}
                                </div>

                                <div className="text-sm text-gray-400 text-center font-medium">
                                    {track.duration}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}