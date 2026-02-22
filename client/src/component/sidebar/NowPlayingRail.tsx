import { ChevronLeft } from "lucide-react";
import { memo } from "react";

const NowPlayingRail = ({ onOpen }: { onOpen: () => void }) => {
    return (
        <div
            onClick={onOpen}
            className="
                h-full flex items-center justify-center
                cursor-pointer
                hover:bg-white/5
                transition-colors
            "
        >
            <ChevronLeft size={22} className="text-gray-400" />
        </div>
    );
}

export default memo(NowPlayingRail);