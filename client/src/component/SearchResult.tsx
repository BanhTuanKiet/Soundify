import { useState } from 'react';
import { TopResultCard } from './card/TopResultCard';
import { TOP_ARTIST } from '../util/Artist';
import { FilterBar } from './sidebar/FilterTab';
import type { SongBasic } from '../model/Song';
import { SongSection } from './card/SongCard';
// import { MusicSection } from './card/MusicDiscoveryCard';

const SONGS: SongBasic[] = [
    {
        id: 's1',
        title: 'Simple Love',
        artists: [
            { id: 'a1', name: 'Anh Bằng', avatarUrl: "", type: "Artist" },
            { id: 'a2', name: 'Mason Nguyen', avatarUrl: "", type: "Artist" }
        ],
        albumCover: 'https://i.scdn.co/image/ab67616d0000b273d7f5e8ebca63834d02be8168',
        durationSeconds: 180,
        isExplicit: true,
        isLiked: true,
    },
    {
        id: 's2',
        title: 'Simp Gái 808',
        artists: [
            { id: 'a1', name: 'Anh Bằng', avatarUrl: "", type: "Artist" },
            { id: 'a2', name: 'Mason Nguyen', avatarUrl: "", type: "Artist" }
        ],
        albumCover: 'https://i.scdn.co/image/ab67616d0000b273c8fd7c8b14dee3bd49ef6d78',
        durationSeconds: 180,
        isExplicit: true,
        isLiked: true,
    },
    {
        id: 's3',
        title: 'sao anh chưa về nhà',
        artists: [
            { id: 'a1', name: 'Anh Bằng', avatarUrl: "", type: "Artist" },
            { id: 'a2', name: 'Mason Nguyen', avatarUrl: "", type: "Artist" }
        ],
        albumCover: 'https://i.scdn.co/image/ab67616d0000b273e5f0e5d3d4f3d3d4f3d3d4f3',
        durationSeconds: 180,
        isExplicit: true,
        isLiked: true,
    },
    {
        id: 's4',
        title: 'SAIROI',
        artists: [
            { id: 'a1', name: 'Anh Bằng', avatarUrl: "", type: "Artist" },
            { id: 'a2', name: 'Mason Nguyen', avatarUrl: "", type: "Artist" }
        ],
        albumCover: 'https://i.scdn.co/image/ab67616d0000b273a5e5e5e5e5e5e5e5e5e5e5e5',
        durationSeconds: 180,
        isExplicit: true,
        isLiked: true,
    },
];

const FILTER_TABS = ['All', 'Artists', 'Songs', 'Playlists', 'Albums', 'Podcasts & Shows', 'Profiles', 'Genres & Moods', 'Audiobooks'];

export default function SearchResults() {
    const [activeTab, setActiveTab] = useState('All');

    return (
        <div className="min-h-full bg-[#121212] text-white">
            <div className="px-6 pt-4 pb-2">
                <div className="flex gap-2 flex-wrap">
                    <FilterBar FilterTabs={FILTER_TABS} activeTab={activeTab} onChange={setActiveTab} />
                </div>
            </div>

            <div className="px-6 py-6 space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <div>
                        <h2 className="text-white text-2xl font-extrabold mb-2">Top result</h2>
                        <TopResultCard artist={TOP_ARTIST} />
                    </div>

                    <div>
                        <h2 className="text-white text-2xl font-extrabold mb-4">Songs</h2>
                        <SongSection songs={SONGS} />
                    </div>
                </div>

                {/* <MusicSection
                    title="Suggested Artists"
                    items={artistsData}
                /> */}
            </div>
        </div>
    );
}