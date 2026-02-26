import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

export interface DisplayCardItem {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    type: 'artist' | 'album' | 'song';
    isRoundImage: boolean;
}

export const MusicCard: React.FC<{ item: DisplayCardItem }> = ({ item }) => {
    return (
        <div className="group relative p-2 md:p-3 rounded-md transition-all duration-300 cursor-pointer w-full hover:bg-[#282828] bg-transparent">
            <div className="relative mb-2 md:mb-4">
                <div className="aspect-square w-full shadow-lg overflow-hidden">
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${item.isRoundImage ? 'rounded-full' : 'rounded-md'}`}
                    />
                </div>

                <div className="absolute bottom-2 right-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl z-10">
                    <button className="bg-green-500 rounded-full p-2 md:p-3 text-black hover:scale-105 hover:bg-green-400 flex items-center justify-center shadow-2xl">
                        <Play fill="black" size={16} className="ml-0.5 md:ml-1 md:w-5 md:h-5" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-0.5 min-h-[40px]">
                <h3 className="text-white font-bold truncate text-[13px] md:text-base" title={item.title}>
                    {item.title}
                </h3>
                <p className="text-[#a7a7a7] text-[11px] md:text-sm line-clamp-2 font-medium">
                    {item.subtitle}
                </p>
            </div>
        </div>
    );
};

export const MusicSection: React.FC<{ title: string; subTitle?: string; items: DisplayCardItem[] }> = ({ title, subTitle, items }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    if (items.length === 0) return null;

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' 
                ? scrollLeft - clientWidth * 0.8 
                : scrollLeft + clientWidth * 0.8;
            
            scrollRef.current.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div 
            className="mb-6 md:mb-8 px-4 md:px-6 relative group/section"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-between items-end mb-3 md:mb-4">
                <div>
                    {subTitle && (
                        <p className="text-[9px] md:text-xs text-[#b3b3b3] uppercase tracking-widest font-bold mb-0.5">
                            {subTitle}
                        </p>
                    )}
                    <h2 className="text-lg md:text-2xl font-bold text-white hover:underline cursor-pointer tracking-tight">
                        {title}
                    </h2>
                </div>
                <button className="text-[#a7a7a7] text-[10px] md:text-xs font-bold hover:underline hover:text-white uppercase tracking-wider mb-1">
                    Show all
                </button>
            </div>

            <div className={`hidden md:block transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <button 
                    onClick={() => scroll('left')}
                    className="absolute left-2 top-[55%] -translate-y-1/2 z-20 bg-[#181818] p-2 rounded-full shadow-xl hover:scale-105 border border-white/10 text-white"
                >
                    <ChevronLeft size={24} />
                </button>
                <button 
                    onClick={() => scroll('right')}
                    className="absolute right-2 top-[55%] -translate-y-1/2 z-20 bg-[#181818] p-2 rounded-full shadow-xl hover:scale-105 border border-white/10 text-white"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            <div 
                ref={scrollRef}
                className="flex gap-3 md:gap-6 overflow-x-auto pb-4 snap-x scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {items.map((item) => (
                    <div key={item.id} className="w-[140px] md:w-[180px] flex-shrink-0 snap-start">
                        <MusicCard item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};