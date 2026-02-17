import React, { useMemo } from 'react';
import { Play, } from 'lucide-react';

interface Artist {
    Id: string;
    Name: string;
    Bio?: string;
    AvatarUrl: string;
    CreatedAt?: string;
}

// interface Genre {
//   Id: number;
//   Name: string;
// }

interface Album {
    Id: string;
    Title: string;
    ArtistId: string;
    ReleaseDate: string;
    CoverImageUrl: string;
    CreatedAt?: string;
}

interface Song {
    Id: string;
    Title: string;
    AlbumId: string;
    GenreId?: number;
    FileUrl: string;
    DurationSeconds: number;
    PlayCount: number;
    IsExplicit: boolean;
    CreatedAt?: string;
}

interface DisplayCardItem {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    type: 'artist' | 'album' | 'song';
    isRoundImage: boolean;
}

const MOCK_ARTISTS: Artist[] = [
    { Id: 'a1', Name: 'Low G', AvatarUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop', Bio: 'Rapper thủ đô' },
    { Id: 'a2', Name: 'Wren Evans', AvatarUrl: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=400&h=400&fit=crop', Bio: 'Ca sĩ Gen Z' },
    { Id: 'a3', Name: 'tlinh', AvatarUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e8d03?w=400&h=400&fit=crop', Bio: 'Nữ Rapper' },
    { Id: 'a4', Name: 'Obito', AvatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop', Bio: 'Rapper miền Tây' },
];

const MOCK_ALBUMS: Album[] = [
    { Id: 'alb1', Title: 'Loi Choi', ArtistId: 'a2', ReleaseDate: '2023-12-01', CoverImageUrl: 'https://images.unsplash.com/photo-1459749411177-0473ef716175?w=400&h=400&fit=crop' },
    { Id: 'alb2', Title: 'Ái', ArtistId: 'a3', ReleaseDate: '2023-11-15', CoverImageUrl: 'https://images.unsplash.com/photo-1621360841013-c768371e93cf?w=400&h=400&fit=crop' },
    { Id: 'alb3', Title: 'Đánh Đổi', ArtistId: 'a4', ReleaseDate: '2023-10-10', CoverImageUrl: 'https://images.unsplash.com/photo-1504509546545-e000b4a62925?w=400&h=400&fit=crop' },
];

const MOCK_SONGS: Song[] = [
    { Id: 's1', Title: 'Tò Te Tí', AlbumId: 'alb1', PlayCount: 5000000, IsExplicit: false, FileUrl: '', DurationSeconds: 180 },
    { Id: 's2', Title: 'Nếu lúc đó', AlbumId: 'alb2', PlayCount: 8000000, IsExplicit: true, FileUrl: '', DurationSeconds: 200 },
    { Id: 's3', Title: 'Hà Nội Xịn', AlbumId: 'alb3', PlayCount: 1200000, IsExplicit: true, FileUrl: '', DurationSeconds: 210 },
];

const getArtistById = (id: string) => MOCK_ARTISTS.find(a => a.Id === id);
const getAlbumById = (id: string) => MOCK_ALBUMS.find(a => a.Id === id);

const MusicCard: React.FC<{ item: DisplayCardItem }> = ({ item }) => {
    return (
        <div className="group relative p-4 bg-[#181818] hover:bg-[#282828] rounded-md transition-all duration-300 cursor-pointer w-[180px] flex-shrink-0">
            <div className="relative mb-4">
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className={`w-full aspect-square object-cover shadow-lg ${item.isRoundImage ? 'rounded-full' : 'rounded-md'}`}
                />

                <div className={`absolute bottom-2 right-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl z-10`}>
                    <button className="bg-green-500 rounded-full p-3 text-black hover:scale-105 hover:bg-green-400 flex items-center justify-center">
                        <Play fill="black" size={20} className="ml-1" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-1 min-h-[60px]">
                <h3 className="text-white font-bold truncate text-base" title={item.title}>
                    {item.title}
                </h3>
                <p className="text-[#a7a7a7] text-sm line-clamp-2 font-medium flex items-center gap-1">
                    {item.subtitle}
                </p>
            </div>
        </div>
    );
};

const Section: React.FC<{ title: string; subTitle?: string; items: DisplayCardItem[] }> = ({ title, subTitle, items }) => {
    if (items.length === 0) return null;

    return (
        <div className="mb-8">
            <div className="flex justify-between items-end mb-4 px-4">
                <div>
                    {subTitle && (
                        <p className="text-[10px] text-[#b3b3b3] uppercase tracking-wide font-bold">
                            {subTitle}
                        </p>
                    )}
                    <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
                        {title}
                    </h2>
                </div>
                <button className="text-[#a7a7a7] text-xs font-bold hover:underline hover:text-white uppercase tracking-wider mb-1">
                    Show all
                </button>
            </div>
            <div className="flex overflow-x-auto gap-6 px-4 pb-4 scrollbar-hide snap-x">
                {items.map((item) => (
                    <MusicCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default function MusicDiscovery() {
    const trendingData: DisplayCardItem[] = useMemo(() => {
        const sortedSongs = [...MOCK_SONGS].sort((a, b) => b.PlayCount - a.PlayCount);

        return sortedSongs.map(song => {
            const album = getAlbumById(song.AlbumId);
            const artist = album ? getArtistById(album.ArtistId) : null;
            
            return {
                id: song.Id,
                title: song.Title,
                subtitle: artist ? artist.Name : 'Unknown Artist',
                imageUrl: album ? album.CoverImageUrl : '',
                type: 'song',
                isRoundImage: false
            };
        });
    }, []);

    const newReleasesData: DisplayCardItem[] = useMemo(() => {
        return MOCK_ALBUMS.map(album => {
            const artist = getArtistById(album.ArtistId);
            return {
                id: album.Id,
                title: album.Title,
                subtitle: artist ? artist.Name : 'Various Artists',
                imageUrl: album.CoverImageUrl,
                type: 'album',
                isRoundImage: false
            };
        });
    }, []);

    const artistData: DisplayCardItem[] = useMemo(() => {
        return MOCK_ARTISTS.map(artist => ({
            id: artist.Id,
            title: artist.Name,
            subtitle: 'Artist', 
            imageUrl: artist.AvatarUrl,
            type: 'artist',
            isRoundImage: true 
        }));
    }, []);

    const moreLikeData: DisplayCardItem[] = useMemo(() => {
        return [...artistData.slice(1), ...newReleasesData.slice(0, 2)];
    }, [artistData, newReleasesData]);

    return (
        <div className="min-h-screen bg-[#121212] p-6 font-sans text-white rounded">
            <div className="max-w-7xl mx-auto py-6">
                <Section
                    title="Low G"
                    subTitle="More Like"
                    items={moreLikeData}
                />

                <Section
                    title="Trending Now"
                    subTitle="Viral Hits"
                    items={trendingData}
                />

                <Section
                    title="Suggested Artists"
                    items={artistData}
                />

                {/* <Section
                    title="New Releases"
                    items={newReleasesData}
                /> */}
            </div>
        </div>
    );
}