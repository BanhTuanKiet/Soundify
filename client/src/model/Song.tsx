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
