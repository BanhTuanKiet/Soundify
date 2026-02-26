import React, { useState } from 'react';
import { MoreHorizontal, Maximize2, PanelRightClose, PanelRightOpen, Check } from 'lucide-react';
import type { NextSong, Song } from '../../model/Song';
import type { Artist } from '../../model/Artist';
import QueueDrawer from './QueueDrawer';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    currentSong: Song & { coverUrl: string };
    artists: Artist[];
    nextInQueue: NextSong;
}

const NowPlayingPanel: React.FC<SidebarProps> = ({ isOpen, onClose, currentSong, artists, nextInQueue }) => {
    const [isQueueOpen, setIsQueueOpen] = useState(false);

    if (!currentSong) return null;

    return (
        <aside
            className={`
                fixed md:relative top-0 right-0 h-full z-40
                shrink-0 bg-black text-white overflow-hidden 
                transition-all duration-300 ease-in-out
                ${isOpen 
                    ? "w-full md:w-[300px] lg:w-[350px] translate-x-0" 
                    : "w-full md:w-0 translate-x-full md:translate-x-0"}
            `}
        >
            <div className="flex flex-col h-full w-full md:w-[300px] lg:w-[350px]">
                <div className="h-14 px-4 flex items-center justify-between border-b border-white/10 shrink-0 bg-black">
                    <div className="flex items-center gap-3 min-w-0">
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-[#2a2a2a] text-gray-400 hover:text-white transition-colors"
                        >
                            {isOpen ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
                        </button>
                        <span className="font-semibold text-sm truncate">
                            {currentSong.title}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400 ">
                        <MoreHorizontal size={18} className="hover:text-white cursor-pointer" />
                        <Maximize2 size={16} className="hover:text-white cursor-pointer" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-hover">
                    <div className="relative group mb-6 mt-4">
                        <img
                            src={currentSong.coverUrl || "https://via.placeholder.com/400"}
                            alt={currentSong.title}
                            className="w-full aspect-square object-cover rounded-lg shadow-2xl"
                        />
                    </div>

                    <div className="mb-8 space-y-1">
                        <div className="flex items-center gap-2 min-w-0">
                            <h1 className="text-2xl font-black truncate">{currentSong.title}</h1>
                            <div className="bg-green-500 text-black rounded-full w-5 h-5 flex items-center justify-center shadow shrink-0">
                                <Check size={12} />
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm truncate">
                            {artists.map(a => a.name).join(', ')}
                        </p>
                    </div>

                    <section className="bg-[#181818] rounded-xl p-4 mb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-sm">Credits</h3>
                            <button className="text-xs font-bold text-gray-400 hover:underline hover:text-white">Show all</button>
                        </div>
                        <div className="space-y-4">
                            {artists.slice(0, 2).map((artist) => (
                                <div key={artist.id} className="flex justify-between items-center">
                                    <div className="min-w-0">
                                        <p className="font-bold text-sm hover:underline cursor-pointer truncate">{artist.name}</p>
                                        <p className="text-xs text-gray-400">Artist</p>
                                    </div>
                                    <button className="px-4 py-1 border border-gray-500 rounded-full text-xs font-bold hover:scale-105 hover:border-white transition-all shrink-0">
                                        Follow
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-[#181818] rounded-xl p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-sm">Next in queue</h3>
                            <button
                                onClick={() => setIsQueueOpen(true)}
                                className="text-xs font-bold text-gray-400 hover:underline hover:text-white"
                            >
                                Open queue
                            </button>
                        </div>

                        {nextInQueue && (
                            <div
                                onClick={() => setIsQueueOpen(true)}
                                className="flex items-center gap-3 p-2 hover:bg-[#2a2a2a] rounded-md transition-colors cursor-pointer group"
                            >
                                <img
                                    src={nextInQueue.coverUrl}
                                    className="w-12 h-12 rounded object-cover shadow-lg"
                                    alt="Next"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{nextInQueue.title}</p>
                                    <p className="text-xs text-gray-400 truncate">
                                        {nextInQueue.isExplicit && <span className="mr-1 font-bold">E</span>}
                                        {nextInQueue.artists.join(', ')}
                                    </p>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>

            <QueueDrawer
                isOpen={isQueueOpen}
                onClose={() => setIsQueueOpen(false)}
                nowPlaying={nextInQueue}
                queue={[nextInQueue]}
            />
        </aside>
    );
};

export default NowPlayingPanel;