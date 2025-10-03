import { TvShow } from './TvShow';


export interface Actor {
  id: number;
  name: string;
  birthDate: string;
  photoUrl?: string | null;
  biography?: string | null;
  series: { $values: TvShow[] };
}

export {}; // ← torna o ficheiro um módulo