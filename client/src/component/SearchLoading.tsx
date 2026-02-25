import { useEffect, useState } from "react";

const SEARCH_MESSAGES = [
    "Đang tìm kiếm...",
    "Đang phân tích âm nhạc...",
    "Đang lọc kết quả...",
    "Sắp xong rồi...",
];

const BAR_COUNT = 5;

function AudioBars() {
    return (
        <div className="flex items-end gap-[3px] h-8">
            {Array.from({ length: BAR_COUNT }).map((_, i) => (
                <div
                    key={i}
                    className="w-1.5 rounded-full bg-[#1DB954]"
                    style={{
                        animation: `audioBar 1s ease-in-out infinite`,
                        animationDelay: `${i * 0.12}s`,
                        height: "100%",
                    }}
                />
            ))}
            <style>{`
                @keyframes audioBar {
                    0%, 100% { transform: scaleY(0.15); opacity: 0.4; }
                    50% { transform: scaleY(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

function SkeletonCard({ isRound = false, delay = 0 }: { isRound?: boolean; delay?: number }) {
    return (
        <div
            className="flex flex-col gap-3 w-[160px]"
            style={{ animation: `fadeIn 0.4s ease forwards`, animationDelay: `${delay}s`, opacity: 0 }}
        >
            <div
                className={`w-full aspect-square bg-[#282828] ${isRound ? "rounded-full" : "rounded-lg"}`}
                style={{ animation: "shimmer 1.6s infinite linear" }}
            />
            <div className="h-3 w-3/4 rounded-full bg-[#282828]" style={{ animation: "shimmer 1.6s infinite linear" }} />
            <div className="h-2.5 w-1/2 rounded-full bg-[#1e1e1e]" style={{ animation: "shimmer 1.6s 0.2s infinite linear" }} />
            <style>{`
                @keyframes shimmer {
                    0% { background-color: #282828; }
                    50% { background-color: #333333; }
                    100% { background-color: #282828; }
                }
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}

function SkeletonRow({ isRound = false }: { title: string; isRound?: boolean }) {
    return (
        <div className="mb-8">
            <div className="h-5 w-40 rounded-md bg-[#282828] mb-4" style={{ animation: "shimmer 1.6s infinite linear" }} />
            <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonCard key={i} isRound={isRound} delay={i * 0.07} />
                ))}
            </div>
        </div>
    );
}

export default function SearchLoading() {
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIndex(prev => (prev + 1) % SEARCH_MESSAGES.length);
        }, 1400);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full px-2 py-4">
            {/* Header status */}
            <div className="flex items-center gap-3 mb-8">
                <AudioBars />
                <span
                    key={msgIndex}
                    className="text-[#b3b3b3] text-sm font-medium tracking-wide"
                    style={{ animation: "fadeSlideIn 0.35s ease forwards" }}
                >
                    {SEARCH_MESSAGES[msgIndex]}
                </span>
            </div>

            {/* Skeleton sections */}
            <SkeletonRow title="Nghệ sĩ" isRound />
            <SkeletonRow title="Bài hát" />
            <SkeletonRow title="Album" />

            <style>{`
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(4px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes shimmer {
                    0% { background-color: #282828; }
                    50% { background-color: #333333; }
                    100% { background-color: #282828; }
                }
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}