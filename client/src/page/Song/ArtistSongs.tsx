import { Clock, Shuffle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { letterColorMap } from '../../util/Color';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import type { Song } from '../../model/Song';
import type { Artist } from '../../model/Artist';

interface Track {
    id: string;
    title: string;
    playCount: string;
    duration: string;
    imageUrl: string;
}

const mockTracks: Track[] = [
    {
        id: '1',
        title: 'Dạo Này',
        playCount: '5,280,571',
        duration: '4:44',
        imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=64&q=80',
    },
    {
        id: '2',
        title: '1000 Ánh Mắt',
        playCount: '31,562,302',
        duration: '2:32',
        imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=64&q=80',
    },
];

const gridBase = 'grid-cols-[32px_1fr_40px]';
const gridLg = 'lg:grid-cols-[32px_minmax(200px,4fr)_minmax(140px,2fr)_60px]';

const ArtistSongs: React.FC = () => {
    const { artistId } = useParams()
    const [artist, setArtist] = useState<Artist | null>()
    const [songs, setSongs] = useState<Song | null>()

    const firstLetter = "Low G".charAt(0).toLowerCase();
    const bgColor = letterColorMap[firstLetter] ?? '#333';

    useEffect(() => {
        const fetchArtistSongs = async () => {
            try {
                const [artistResponse, songsResponse] = await Promise.all([
                    axios.get(`/artists/${artistId}`),
                    axios.get(`/songs/${artistId}`)
                ]);

                setArtist(artistResponse.data)
                setSongs(songsResponse.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchArtistSongs()
    }, [artistId])

    console.log(artist)
    console.log(songs)

    return (
        <div className="text-white font-sans antialiased bg-[#121212]">
            <div
                className="relative h-[40vh] min-h-[340px] w-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1920&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent rounded-lg"></div>

                <div className="absolute bottom-6 left-8 flex flex-col z-10">
                    <h1 className="text-6xl md:text-[6rem] font-black tracking-tighter mb-4 text-white">Obito</h1>
                    <p className="text-sm font-medium text-gray-100">1,562,600 monthly listeners</p>
                </div>
            </div>

            <main className="flex-1 min-w-0 overflow-x-hidden ">
                <div
                    className="sticky top-0 z-50 w-full"
                    style={{
                        background: `linear-gradient(to bottom, ${bgColor}, #121212)`,
                    }}
                >
                    <div className="px-8 py-6 flex items-center gap-6 max-w-full overflow-hidden">
                        <button className="w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center hover:scale-105 hover:bg-[#1fdf64] transition-all duration-200 shrink-0 shadow-lg shadow-black/40">
                            <svg height="28" width="28" viewBox="0 0 24 24" fill="#000000">
                                <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                            </svg>
                        </button>

                        <div className="w-8 h-8 rounded overflow-hidden shrink-0 border border-gray-600 cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=64&q=80" alt="Small Context" className="w-full h-full object-cover" />
                        </div>

                        <button className="text-[#1ed760] hover:scale-105 transition-transform">
                            <Shuffle />
                        </button>

                        <button className="border border-gray-500 rounded-full px-4 py-1.5 text-sm font-bold text-white hover:border-white transition-colors duration-200">
                            Following
                        </button>

                        <button className="bg-transparent text-gray-400 hover:text-white transition-colors">
                            <svg
                                height="32"
                                width="32"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </main>

            <div className="px-8 mt-4 max-w-6xl">
                <div
                    className={`
                        grid ${gridBase} ${gridLg}
                        px-2 py-2 text-gray-400 text-sm font-medium
                        border-b border-white/10 mb-2 uppercase tracking-wider
                    `}
                >
                    <div className="text-center">#</div>
                    <div>Title</div>
                    <div className="hidden lg:block text-center">Play Count</div>
                    <div className="flex justify-center">
                        <Clock size={16} />
                    </div>
                </div>

                <div className="flex flex-col">
                    {mockTracks.map((track, index) => (
                        <div
                            key={track.id}
                            className={`
                                grid ${gridBase} ${gridLg}
                                items-center gap-3 px-2 py-2
                                rounded-md hover:bg-white/10
                                group transition cursor-pointer font-bold
                            `}
                        >
                            <div className="flex justify-center relative text-gray-400">
                                <span className="group-hover:invisible">
                                    {index + 1}
                                </span>
                                <svg
                                    className="absolute invisible group-hover:visible text-white"
                                    height="16"
                                    width="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
                                </svg>
                            </div>

                            <div className="flex items-center gap-3 min-w-0">
                                <img
                                    src={track.imageUrl}
                                    alt={track.title}
                                    className="w-10 h-10 rounded object-cover shrink-0"
                                />

                                <span className="text-base font-medium truncate group-hover:underline">
                                    {track.title}
                                </span>
                            </div>

                            <div className="hidden lg:block text-sm text-gray-400 text-center">
                                {track.playCount}
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
};

export default ArtistSongs;