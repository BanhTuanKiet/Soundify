import { CheckCircle2, Play } from "lucide-react";
import { useState } from "react";
import type { SongBasic } from "../../model/Song";

type SongCardProps = {
    song: SongBasic;
    index: number
}

type SongSectionProps = {
    songs: SongBasic[]
}

export const SongRow: React.FC<SongCardProps> = ({ song, index }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            key={index}
            className={`flex items-center gap-3 px-2 py-1 rounded-md hover:bg-[#282828] transition-colors duration-200 cursor-pointer group`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative w-10 h-10 flex-shrink-0">
                <img
                    src={song.albumCover}
                    alt={song.title}
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(song.title)}&background=333&color=fff&size=80`;
                    }}
                />
                {hovered && (
                    <div className="absolute inset-0 bg-black/60 rounded flex items-center justify-center">
                        <Play fill="white" size={14} className="ml-0.5" />
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                    {song.isExplicit && (
                        <span className="text-[10px] bg-[#a7a7a7] text-black font-bold px-1 rounded leading-none py-0.5 flex-shrink-0">E</span>
                    )}
                    <span className="text-white text-sm font-medium truncate">{song.title}</span>
                </div>
                <p className="text-[#a7a7a7] text-xs truncate">{song.artists.join(', ')}</p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
                {song.isLiked && (
                    <CheckCircle2 size={16} className="text-green-500" fill="currentColor" />
                )}
                <span className="text-[#a7a7a7] text-sm">{song.durationSeconds}</span>
            </div>
        </div>
    );
};

export const SongSection: React.FC<SongSectionProps> = ({ songs }) => {
    return (
        <div className="space-y-1">
            {songs.map((song, i) => (
                <SongRow key={song.id} song={song} index={i} />
            ))}
        </div>
    )
}