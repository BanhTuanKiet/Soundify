import { Pause, Play, Volume1, VolumeOff } from "lucide-react";
import type { ActiveArtistState, ArtistBasic } from "../../model/Artist";
import { useNavigate } from "react-router-dom";

interface FollowingArtistProps {
    artist: ArtistBasic
    activeArtist: ActiveArtistState | null
    setActiveArtist: (artist: ActiveArtistState | null) => void
    isActive: boolean
    isCollapsed: boolean
}
export default function FollowingArtist({ artist, activeArtist, setActiveArtist, isActive, isCollapsed }: FollowingArtistProps) {
    const navigate = useNavigate()

    const handleArtistId = (id: string) => {
        navigate(`/artist/${id}`);
    };

    return (
        <div
            key={artist.id}
            className={`group relative flex items-center gap-3 p-2 rounded-md hover:bg-[#1f1f1f] cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}
        >
            <div className="relative flex-shrink-0">
                <img
                    src={artist.avatarUrl}
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveArtist({
                                        id: artist.id,
                                        isActive: false,
                                    });
                                }}
                            />
                        ) : (
                            <Play
                                size={22}
                                className="text-white ml-1 fill-current"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveArtist({
                                        id: artist.id,
                                        isActive: true,
                                    });
                                }}
                            />
                        )}
                    </div>
                )}
            </div>

            {!isCollapsed && (
                <div
                    className="flex flex-1 items-center justify-between overflow-hidden"
                    onClick={() => handleArtistId(artist.id)}
                >
                    <div className="overflow-hidden pr-2">
                        <h4 className={`font-medium truncate ${activeArtist?.id === artist.id ? 'text-[#1db954]' : 'text-white'}`}>{artist.name}</h4>
                        <p className="text-sm text-[#9ca3af] truncate">Artist</p>
                    </div>

                    {isActive ? (
                        <div className='overflow-hidden pr-2'>
                            <Volume1 size={20} className="text-[#1db954] fill-current" />
                        </div>
                    ) : (
                        !activeArtist?.isActive && activeArtist?.id == artist.id ? (
                            <div className='overflow-hidden pr-2'>
                                <VolumeOff size={20} className="text-[#1db954] fill-current" />
                            </div>
                        ) : (
                            <></>
                        )
                    )}
                </div>
            )}

            {isCollapsed && (
                <div
                    className="absolute left-[80px] z-[60] hidden group-hover:flex flex-col bg-[#282828] px-3 py-2 rounded-md shadow-2xl whitespace-nowrap min-w-max pointer-events-none"
                    onClick={() => handleArtistId(artist.id)}
                >
                    <h4 className="font-semibold text-white text-[15px] leading-tight mb-0.5">{artist.name}</h4>
                    <p className="text-sm text-[#a7a7a7]">Artist</p>
                </div>
            )}
        </div>
    );
}
