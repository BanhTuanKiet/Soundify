import { Pause, Play, Volume1, VolumeOff } from "lucide-react";
import type { ActiveArtistState, ArtistBasic } from "../../model/Artist";
import { useNavigate } from "react-router-dom";

interface FollowingArtistProps {
    artist: ArtistBasic
    activeArtist: ActiveArtistState | null
    setActiveArtist: (artist: ActiveArtistState | null) => void
    isActive: boolean
    isCollapsed: boolean
    isExpanded?: boolean
}

export default function FollowingArtistCard({ artist, activeArtist, setActiveArtist, isActive, isCollapsed, isExpanded = false }: FollowingArtistProps) {
    const navigate = useNavigate()

    const handleArtistId = (id: string) => {
        navigate(`/artist/${id}`);
    };

    return (
        <div
            key={artist.id}
            onClick={() => handleArtistId(artist.id)}
            className={`
                group relative cursor-pointer transition-colors
                ${isExpanded
                    ? 'flex flex-col gap-4 p-4 bg-[#181818] hover:bg-[#282828] rounded-md'
                    : `flex items-center gap-3 p-2 rounded-md hover:bg-[#1f1f1f] ${isCollapsed ? 'justify-center' : ''}`
                }
            `}
        >
            <div className={`relative flex-shrink-0 ${isExpanded ? 'w-full aspect-square' : 'w-12 h-12'}`}>
                <img
                    src={artist.avatarUrl}
                    alt={artist.name}
                    className={`
                        w-full h-full rounded-full object-cover shadow-sm transition-all
                        ${!isCollapsed && isActive && !isExpanded ? 'opacity-100' : ''} 
                        ${!isCollapsed && !isExpanded ? 'group-hover:opacity-50' : ''}
                        ${isExpanded ? 'shadow-lg' : ''}
                    `}
                />

                {!isCollapsed && !isExpanded && (
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
                                    setActiveArtist({ id: artist.id, isActive: false });
                                }}
                            />
                        ) : (
                            <Play
                                size={22}
                                className="text-white ml-1 fill-current"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveArtist({ id: artist.id, isActive: true });
                                }}
                            />
                        )}
                    </div>
                )}

                {isExpanded && (
                    <div className={`
                        absolute right-2 bottom-2 w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center shadow-xl
                        transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#1fdf64]
                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}
                    `}>
                        {isActive ? (
                            <Pause
                                size={24}
                                className="text-black fill-current"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveArtist({ id: artist.id, isActive: false });
                                }}
                            />
                        ) : (
                            <Play
                                size={24}
                                className="text-black fill-current ml-1"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveArtist({ id: artist.id, isActive: true });
                                }}
                            />
                        )}
                    </div>
                )}
            </div>

            {(!isCollapsed || isExpanded) && (
                <div className={`flex flex-1 items-center justify-between overflow-hidden ${isExpanded ? 'w-full' : ''}`}>
                    <div className={`overflow-hidden pr-2 ${isExpanded ? 'w-full' : ''}`}>
                        <h4 className={`
                            font-medium truncate 
                            ${activeArtist?.id === artist.id ? 'text-[#1db954]' : 'text-white'}
                            ${isExpanded ? 'text-base mb-1' : ''}
                        `}>
                            {artist.name}
                        </h4>
                        <p className={`text-[#9ca3af] truncate text-sm font-medium`}>Artist</p>
                    </div>

                    {!isExpanded && (
                        isActive ? (
                            <div className='overflow-hidden pr-2'>
                                <Volume1 size={20} className="text-[#1db954] fill-current" />
                            </div>
                        ) : (
                            !activeArtist?.isActive && activeArtist?.id == artist.id ? (
                                <div className='overflow-hidden pr-2'>
                                    <VolumeOff size={20} className="text-[#1db954] fill-current" />
                                </div>
                            ) : null
                        )
                    )}
                </div>
            )}

            {isCollapsed && !isExpanded && (
                <div className="absolute left-[80px] z-[60] hidden group-hover:flex flex-col bg-[#282828] px-3 py-2 rounded-md shadow-2xl whitespace-nowrap min-w-max pointer-events-none">
                    <h4 className="font-semibold text-white text-[15px] leading-tight mb-0.5">{artist.name}</h4>
                    <p className="text-sm text-[#a7a7a7]">Artist</p>
                </div>
            )}
        </div>
    );
}