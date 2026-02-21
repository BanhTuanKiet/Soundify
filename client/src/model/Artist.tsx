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
}

export interface ArtistBasic {
    id: string
    avatarUrl: string 
    name: string
}