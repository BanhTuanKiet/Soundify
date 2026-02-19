import { useState } from "react";
import MusicDiscovery from "../../component/card/MusicDiscovery";
import NowPlayingPanel from "../../component/sidebar/NowPlayingPanel";
import NowPlayingRail from "../../component/sidebar/NowPlayingRail";
import Footer from "../../component/footer/Footer";
import type { NextSong, Song } from "../../model/Song";
import type { Artist } from "../../model/Artist";

const MOCK_ARTISTS: Artist[] = [
    {
        id: 'a1',
        name: 'Anh Bằng',
        bio: 'Nghệ sĩ trẻ tài năng...',
        avatarUrl: 'https://i.scdn.co/image/ab6761610000e5ebed32008453489e223048a60f',
        createdAt: new Date().toISOString(),
    },
    {
        id: 'a2',
        name: '24k.Right',
        bio: 'Rapper nổi tiếng từ sân chơi Rap Việt.',
        avatarUrl: 'https://i.scdn.co/image/ab6761610000e5eb473062886c5f7e7f722c1533',
        createdAt: new Date().toISOString(),
    },
    {
        id: 'a3',
        name: 'Nhism',
        bio: 'Streamer kiêm nghệ sĩ giải trí.',
        avatarUrl: 'https://i.scdn.co/image/ab6761610000e5eb797441584b423f790c50d180',
        createdAt: new Date().toISOString(),
    }
];

const CURRENT_SONG: Song & { coverUrl: string } = {
    id: 's1',
    title: 'Anh Tên Là',
    albumId: 'alb1',
    genreId: 1,
    fileUrl: 'https://example.com/song.mp3',
    durationSeconds: 180,
    fileSizeMb: 5.5,
    playCount: 1500000,
    isExplicit: false,
    createdAt: new Date().toISOString(),
    coverUrl: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/3/2/e/e/32ee8fd0248316140536c4b92b618841.jpg',
};

const NEXT_SONG: NextSong = {
    id: 's2',
    title: 'Hai Thằng Bịp',
    artists: [
        { id: 'a1', name: 'Anh Bằng' },
        { id: 'a2', name: 'Mason Nguyen' }
    ],
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734a706599b5032904033b006c',
    isExplicit: true,
};

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#1a1a1a] text-white overflow-hidden">
            <main
                className={`
                    flex-1 overflow-y-auto
                    transition-all duration-300 ease-in-out
                `}
            >
                <MusicDiscovery />
                <Footer />
            </main>

            {
                isSidebarOpen ? (
                    <aside className="w-[350px] h-full border-l border-white/10">
                        <NowPlayingPanel
                            isOpen={isSidebarOpen}
                            onClose={() => setIsSidebarOpen(false)}
                            artists={MOCK_ARTISTS}
                            currentSong={CURRENT_SONG}
                            nextInQueue={NEXT_SONG}
                        />
                    </aside>
                ) : (
                    <aside
                        className="
                            w-[4%]
                            hover:w-[5%]
                            h-full
                            border-l border-white/10
                            transition-all duration-300 ease-in-out
                        "
                    >
                        <NowPlayingRail
                            onOpen={() => setIsSidebarOpen(true)}
                        />
                    </aside>
                )
            }
        </div>
    );
}
