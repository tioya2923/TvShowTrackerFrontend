export interface Episode {
  id: number;
  title: string;
  seasonNumber: number;
  episodeNumber: number;
  airDate: string;
  tvShowId: number;
  imageUrl?: string;   
  videoUrl?: string;  
  description?: string;
}
