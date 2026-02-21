import { Shuffle, SkipBack, Pause, SkipForward, Repeat, CheckCircle2, Mic2, ListMusic, MonitorSpeaker, Volume2, PictureInPicture2, Maximize2 } from "lucide-react";
import type { NextSong } from "../../model/Song";

const currentSong: NextSong = {
    id: "s1",
    title: "Có Em",
    artists: [
        { id: "a1", name: "Madihu" },
        { id: "a2", name: "Low G" }
    ],
    coverUrl: "https://i.scdn.co/image/ab67616d0000b2734a706599b5032904033b006c",
    isExplicit: true
};

export default function PlayerFooter() {
    return (
        <footer className="h-[90px] bg-black text-white px-4 flex items-center justify-between border-t border-[#282828] select-none">
            <div className="flex items-center w-[30%] min-w-[180px] gap-4">
                <img
                    src={currentSong.coverUrl}
                    alt="Cover"
                    className="w-14 h-14 rounded shadow-[0_4px_60px_rgba(0,0,0,.5)]"
                />
                <div className="flex flex-col justify-center">
                    <span className="text-sm text-white font-medium hover:underline cursor-pointer">
                        {currentSong.title}
                    </span>
                    <span className="text-xs text-[#a7a7a7] hover:underline cursor-pointer">
                        {currentSong.artists.map(a => a.name).join(", ")}
                    </span>
                </div>
                <button className="text-[#1ed760] hover:scale-105 transition-transform ml-2">
                    <CheckCircle2 size={20} className="fill-[#1ed760] text-black" />
                </button>
            </div>

            <div className="flex flex-col items-center justify-center w-[40%] max-w-[722px] gap-2">
                <div className="flex items-center gap-6">
                    <button className="text-[#a7a7a7] hover:text-white transition-colors">
                        <Shuffle size={20} />
                    </button>
                    <button className="text-[#a7a7a7] hover:text-white transition-colors">
                        <SkipBack size={20} className="fill-current" />
                    </button>

                    <button className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition-transform">
                        <Pause size={18} className="fill-current" />
                    </button>

                    <button className="text-[#a7a7a7] hover:text-white transition-colors">
                        <SkipForward size={20} className="fill-current" />
                    </button>
                    <button className="text-[#a7a7a7] hover:text-white transition-colors">
                        <Repeat size={20} />
                    </button>
                </div>

                <div className="flex items-center w-full gap-2 text-xs text-[#a7a7a7]">
                    <span>1:39</span>
                    <div className="group h-1 flex-1 bg-[#4d4d4d] rounded-full cursor-pointer flex items-center">
                        <div className="h-full bg-white group-hover:bg-[#1db954] w-[45%] rounded-full relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow" />
                        </div>
                    </div>
                    <span>3:38</span>
                </div>
            </div>

            <div className="flex items-center justify-end w-[30%] min-w-[180px] gap-3 text-[#a7a7a7]">
                <button className="hover:text-white transition-colors"><Mic2 size={18} /></button>
                <button className="hover:text-white transition-colors"><ListMusic size={18} /></button>
                <button className="hover:text-white transition-colors"><MonitorSpeaker size={18} /></button>

                <div className="flex items-center gap-2 group w-[100px] hover:text-white transition-colors">
                    <button><Volume2 size={18} /></button>
                    <div className="h-1 flex-1 bg-[#4d4d4d] rounded-full cursor-pointer flex items-center">
                        <div className="h-full bg-white group-hover:bg-[#1db954] w-[70%] rounded-full relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow" />
                        </div>
                    </div>
                </div>

                <button className="hover:text-white transition-colors"><PictureInPicture2 size={18} /></button>
                <button className="hover:text-white transition-colors"><Maximize2 size={18} /></button>
            </div>
        </footer>
    );
}