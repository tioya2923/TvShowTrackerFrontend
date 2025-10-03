import { Episode } from './Episode';
import { Genre } from './Genre';

export interface TvShow {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  releaseDate: string;
  genres: Genre[];
  episodes: Episode[];
  createdAt: string;
}
export {}; // ← torna o ficheiro um módulo