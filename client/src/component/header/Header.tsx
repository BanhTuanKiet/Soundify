import { Bell, Home, Search, Download } from "lucide-react";
import spotifyIcon from "../../asset/image/Spotify_logo_without_text.svg.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

export default function Header() {
    const { setKeyword } = useContext(SearchContext);
    const navigate = useNavigate()

    return (
        <header className="sticky top-0 z-50 h-16 bg-black px-2 md:px-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4">
                <img
                    src={spotifyIcon}
                    alt="Spotify"
                    className="w-8 h-8 min-w-[32px] cursor-pointer"
                    onClick={() => navigate("/")}
                />
            </div>

            <div className="flex items-center gap-2 md:gap-3 flex-1 max-w-xl mx-2 md:mx-6">
                <button
                    onClick={() => navigate("/")}
                    className="w-10 h-10 min-w-[40px] flex items-center justify-center rounded-full bg-[#1f1f1f] hover:bg-[#2a2a2a] transition">
                    <Home className="text-white" size={20} />
                </button>

                <div className="flex items-center gap-3 bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-transparent focus-within:border-white transition px-4 h-10 rounded-full flex-1 min-w-[50px]">
                    <Search size={18} className="text-gray-400 flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="What do you want to play?"
                        className="bg-transparent outline-none text-white placeholder-gray-400 text-sm w-full hidden sm:block"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <button className="hidden lg:block px-4 py-2 bg-white text-black text-sm font-semibold rounded-full hover:scale-105 transition whitespace-nowrap">
                    Explore Premium
                </button>

                <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-white bg-[#1f1f1f] px-4 py-2 rounded-full hover:bg-[#2a2a2a] transition whitespace-nowrap">
                    <Download size={16} />
                    Install App
                </button>

                <button className="p-2 text-white hover:scale-110 transition relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border border-black"></span>
                </button>

                <div className="w-8 h-8 min-w-[32px] rounded-full bg-pink-500 flex items-center justify-center text-sm font-bold text-black cursor-pointer hover:scale-105 transition">
                    B
                </div>
            </div>
        </header>
    );
}