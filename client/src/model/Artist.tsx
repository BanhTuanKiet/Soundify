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