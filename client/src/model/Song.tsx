import type { ArtistBasic } from "./Artist";

export interface Song {
    id: string;
    title: string;
    albumId?: string | null;
    genreId?: number | null;
    fileUrl: string;
    durationSeconds: number;
    fileSizeMb?: number | null;
    playCount: number;
    isExplicit: boolean;
    createdAt: string;
}

export interface NextSong {
    id: string;
    title: string;
    artists: ArtistBasic[]
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734a706599b5032904033b006c',
    isExplicit: true
}
