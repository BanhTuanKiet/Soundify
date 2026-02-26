import { useState } from "react";
import type { ArtistBasic } from "../../model/Artist";
import { Play } from "lucide-react";

export const TopResultCard: React.FC<{ artist: ArtistBasic }> = ({ artist }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="bg-[#181818] hover:bg-[#282828] transition-colors duration-300 rounded-lg p-5 cursor-pointer relative group h-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative mb-4 w-[96px] h-[96px]">
                <img
                    src={artist.avatarUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover rounded-full shadow-2xl"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.name)}&background=random&size=200`;
                    }}
                />
            </div>

            <h2 className="text-white text-3xl font-extrabold mb-1 tracking-tight">{artist.name}</h2>
            <p className={`text-[#9ca3af] font-medium truncate`}>{artist.type}</p>

            <div
                className={`absolute bottom-5 right-5 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
            >
                <button className="w-12 h-12 bg-green-500 hover:bg-green-400 hover:scale-105 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200">
                    <Play fill="black" size={20} className="ml-1" />
                </button>
            </div>
        </div>
    );
};