export type ActiveArtistState = {
    id: string | null;
    isActive: boolean;
};

export interface Artist {
    id: string;
    name: string;
    bio?: string | null;
    avatarUrl?: string | null;
    createdAt: string;
    type: 'Artist' | 'Band';
    isVerified?: boolean;
}

export interface ArtistBasic {
    id: string
    avatarUrl: string
    name: string
    type: 'Artist' | 'Band'
}
