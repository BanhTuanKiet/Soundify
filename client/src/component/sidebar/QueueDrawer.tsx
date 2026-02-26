import { X } from "lucide-react";
import type { NextSong } from "../../model/Song";
import type { ArtistBasic } from "../../model/Artist";

interface QueueDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    nowPlaying: NextSong;
    queue: NextSong[];
}

export default function QueueDrawer({ isOpen, onClose, nowPlaying, queue }: QueueDrawerProps) {
    const renderArtists = (artists: ArtistBasic[]) => {
        if (!artists) return "";
        return artists.map(a => (typeof a === 'object' ? a.name : a)).join(', ');
    };

    return (
        <div
            className={`
                absolute inset-0 z-50 bg-[#121212] flex flex-col
                transition-transform duration-300 ease-out
                ${isOpen ? "translate-y-0" : "translate-y-full"}
            `}
        >
            <div className="h-14 px-4 flex items-center justify-between border-b border-white/10 shrink-0 bg-[#121212]">
                <h3 className="font-bold text-base">Queue</h3>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-[#2a2a2a]">
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar">
                {nowPlaying && (
                    <section className="mb-8">
                        <p className="text-xs font-bold text-gray-400 mb-4 uppercase">Now playing</p>
                        <div className="flex items-center gap-3 p-2">
                            <img src={nowPlaying.coverUrl} className="w-12 h-12 rounded" alt="" />
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-green-500 truncate">{nowPlaying.title}</p>
                                <p className="text-xs text-gray-400 truncate">{renderArtists(nowPlaying.artists)}</p>
                            </div>
                        </div>
                    </section>
                )}

                <section>
                    <p className="text-xs font-bold text-gray-400 mb-4 uppercase">Next up</p>
                    <div className="space-y-2">
                        {queue.map((song, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 hover:bg-[#2a2a2a] rounded-md group transition-colors">
                                <img src={song.coverUrl} className="w-12 h-12 rounded" alt="" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium truncate">{song.title}</p>
                                    <p className="text-xs text-gray-400 truncate">{renderArtists(song.artists)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}