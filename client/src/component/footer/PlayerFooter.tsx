import { Shuffle, SkipBack, Pause, SkipForward, Repeat, CheckCircle2, Mic2, ListMusic, MonitorSpeaker, Volume2, PictureInPicture2, Maximize2 } from "lucide-react";
import type { NextSong } from "../../model/Song";

const currentSong: NextSong = {
    id: "s1",
    title: "Có Em",
    artists: [
        { id: "a1", name: "Madihu", avatarUrl: "", type: "Artist" },
        { id: "a2", name: "Low G", avatarUrl: "", type: "Artist" }
    ],
    coverUrl: "https://i.scdn.co/image/ab67616d0000b2734a706599b5032904033b006c",
    isExplicit: true
};

export default function PlayerFooter() {
    return (
        <footer className="
                h-[90px] bg-black text-white px-3 sm:px-4
                flex items-center gap-3
                border-t border-[#282828]
                select-none
            ">
            <div className="hidden md:flex items-center gap-4 flex-1 min-w-0">
                <img
                    src={currentSong.coverUrl}
                    alt="Cover"
                    className="w-14 h-14 rounded shadow-[0_4px_60px_rgba(0,0,0,.5)]"
                />

                <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium truncate hover:underline cursor-pointer">
                        {currentSong.title}
                    </span>
                    <span className="text-xs text-[#a7a7a7] truncate hover:underline cursor-pointer">
                        {currentSong.artists.map(a => a.name).join(", ")}
                    </span>
                </div>

                <button className="text-[#1ed760] hover:scale-105 transition-transform">
                    <CheckCircle2 size={20} className="fill-[#1ed760] text-black" />
                </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 gap-2 max-w-[520px] mx-auto">
                <div className="flex items-center gap-4 sm:gap-6">
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
                    <span className="hidden sm:block">1:39</span>
                    <div className="group h-1 flex-1 bg-[#4d4d4d] rounded-full cursor-pointer flex items-center">
                        <div className="h-full bg-white group-hover:bg-[#1db954] w-[45%] rounded-full relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow" />
                        </div>
                    </div>
                    <span className="hidden sm:block">3:38</span>
                </div>
            </div>

            <div className="hidden lg:flex items-center justify-end gap-3 text-[#a7a7a7] flex-1">
                <button className="hover:text-white transition-colors"><Mic2 size={18} /></button>
                <button className="hover:text-white transition-colors"><ListMusic size={18} /></button>
                <button className="hover:text-white transition-colors"><MonitorSpeaker size={18} /></button>

                <div className="hidden xl:flex items-center gap-2 group w-[100px]">
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