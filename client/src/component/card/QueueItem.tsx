import { Play } from "lucide-react";
import type { NextSong } from "../../model/Song";

interface QueueItemProps {
    song: NextSong;
    isActive?: boolean;
}

export function QueueItem({ song, isActive }: QueueItemProps) {
    return (
        <div
            className={`
                flex items-center gap-3 p-2 rounded-md
                hover:bg-[#2a2a2a] cursor-pointer group
                ${isActive ? "text-green-500" : ""}
            `}
        >
            <div className="relative w-10 h-10 shrink-0">
                <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-full h-full rounded object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <Play size={14} />
                </div>
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-sm truncate">{song.title}</p>
                <p className="text-xs text-gray-400 truncate">
                    {song.isExplicit && (
                        <span className="bg-gray-500 text-black px-1 rounded-sm text-[10px] mr-1">
                            E
                        </span>
                    )}
                    {song.artists.join(", ")}
                </p>
            </div>
        </div>
    );
}
