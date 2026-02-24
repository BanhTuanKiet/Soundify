import { useMemo } from 'react';
import { MusicSection, type DisplayCardItem } from "../../component/card/MusicDiscoveryCard";
import Footer from "../../component/footer/Footer";
import { RONALDO_MEME } from '../../util/RONALDO_MEME';
import SearchResults from '../../component/SearchResult';

const MOCK_ARTISTS = [
    { Id: 'a1', Name: 'Low G', AvatarUrl: RONALDO_MEME.ronaldo_1 },
    { Id: 'a2', Name: 'Wren Evans', AvatarUrl: RONALDO_MEME.ronaldo_2 },
    { Id: 'a3', Name: 'tlinh', AvatarUrl: RONALDO_MEME.ronaldo_3 },
    { Id: 'a4', Name: 'Obito', AvatarUrl: RONALDO_MEME.ronaldo_4 },
    { Id: 'a5', Name: 'Yen Lang boy', AvatarUrl: RONALDO_MEME.ronaldo_5 },
    { Id: 'a6', Name: 'Low G', AvatarUrl: RONALDO_MEME.ronaldo_1 },
    { Id: 'a7', Name: 'Wren Evans', AvatarUrl: RONALDO_MEME.ronaldo_2 },
    { Id: 'a8', Name: 'tlinh', AvatarUrl: RONALDO_MEME.ronaldo_3 },
    { Id: 'a9', Name: 'Obito', AvatarUrl: RONALDO_MEME.ronaldo_4 },
    { Id: 'a10', Name: 'Yen Lang boy', AvatarUrl: RONALDO_MEME.ronaldo_5 },
];

const MOCK_ALBUMS = [
    { Id: 'alb1', Title: 'Loi Choi', ArtistId: 'a2', CoverImageUrl: 'https://images.unsplash.com/photo-1459749411177-0473ef716175?w=400&h=400&fit=crop' },
    { Id: 'alb2', Title: 'Ái', ArtistId: 'a3', CoverImageUrl: 'https://images.unsplash.com/photo-1621360841013-c768371e93cf?w=400&h=400&fit=crop' },
    { Id: 'alb3', Title: 'Đánh Đổi', ArtistId: 'a4', CoverImageUrl: 'https://images.unsplash.com/photo-1504509546545-e000b4a62925?w=400&h=400&fit=crop' },
];

const MOCK_SONGS = [
    { Id: 's1', Title: 'Tò Te Tí', AlbumId: 'alb1', PlayCount: 5000000 },
    { Id: 's2', Title: 'Nếu lúc đó', AlbumId: 'alb2', PlayCount: 8000000 },
    { Id: 's3', Title: 'Hà Nội Xịn', AlbumId: 'alb3', PlayCount: 1200000 },
];

export default function Home() {
    const getArtistById = (id: string) => MOCK_ARTISTS.find(a => a.Id === id);
    const getAlbumById = (id: string) => MOCK_ALBUMS.find(a => a.Id === id);

    const trendingData: DisplayCardItem[] = useMemo(() => {
        return [...MOCK_SONGS].sort((a, b) => b.PlayCount - a.PlayCount).map(song => {
            const album = getAlbumById(song.AlbumId);
            const artist = album ? getArtistById(album.ArtistId) : null;
            return {
                id: song.Id,
                title: song.Title,
                subtitle: artist?.Name || 'Unknown Artist',
                imageUrl: album?.CoverImageUrl || '',
                type: 'song',
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

    return (
        <div className="flex h-full w-full bg-[#121212] text-white overflow-hidden">
            <main className="flex-1 w-full overflow-y-auto overflow-x-hidden scrollbar-hover">
                <div className="max-w-[1400px] mx-auto py-6">
                    <SearchResults />

                    <MusicSection
                        title="Suggested Artists"
                        items={artistData}
                    />

                    <MusicSection
                        title="Low G"
                        subTitle="More Like"
                        items={artistData.slice(1, 4)}
                    />

                    <MusicSection
                        title="Trending Now"
                        subTitle="Viral Hits"
                        items={trendingData}
                    />

                    <Footer />
                </div>
            </main>
        </div>
    );
}