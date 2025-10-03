import React from 'react';
import { TvShow } from '../types/TvShow';
import {FavoriteButton} from './FavoriteButton';
import {EpisodeList} from './EpisodeList';

interface SeriesCardProps {
  series: TvShow;
}

export default function SeriesCard({ series }: SeriesCardProps) {
  return (
    <div className="series-card">
      <h2>{series.title}</h2>
      <p><strong>Género:</strong> {series.genres.join(", ")}</p> {/* ← aqui */}
      <p>{series.description}</p>
      <FavoriteButton tvshow={series} />
      <EpisodeList episodes={series.episodes} />
    </div>
  );
}
