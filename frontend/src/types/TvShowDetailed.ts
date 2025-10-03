import { Genre } from './Genre';
import { Actor } from './Actor';
import { Episode } from './Episode';
import { Favorite } from './Favorite';

export interface TvShowDetailed {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  imageUrl?: string;
  videoUrl?: string;
  genres: Genre[];
  actors: Actor[];
  episodes: Episode[];
  favorites: Favorite[];
   
}
