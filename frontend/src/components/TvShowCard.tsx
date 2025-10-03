import React from 'react';
import { FavoriteButton } from './FavoriteButton';
import { EpisodeList } from './EpisodeList';
import { Episode } from '../types/Episode'; // ← importa o tipo completo
import styles from './TvShowCard.module.css';

interface TvShowCardProps {
  tvshow: {
    id: number;
    title: string;
    description?: string;
    imageUrl?: string;
    videoUrl?: string;
    genres?: { name: string }[];
    episodes?: Episode[]
  };
}

export function TvShowCard({ tvshow }: TvShowCardProps) {
  if (!tvshow || !tvshow.title) {
    return <div className={styles.card}>Série inválida ou sem título.</div>;
  }

  const hasGenres = Array.isArray(tvshow.genres) && tvshow.genres.length > 0;
  const hasEpisodes = Array.isArray(tvshow.episodes) && tvshow.episodes.length > 0;

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{tvshow.title}</h2>

      {tvshow.imageUrl ? (
        <img
          src={tvshow.imageUrl}
          alt={`Imagem de ${tvshow.title}`}
          className={styles.image}
        />
      ) : (
        <div className={styles.placeholder}>Imagem não disponível</div>
      )}

      {hasGenres && (
        <p className={styles.genres}>
          <strong>Géneros:</strong>{' '}
          {tvshow.genres!.map((g, index) => (
            <span key={index}>
              {g.name}
              {index < tvshow.genres!.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      )}

      {tvshow.description && (
        <p className={styles.description}>{tvshow.description}</p>
      )}

      {tvshow.videoUrl && (
        <video
          controls
          width="100%"
          className={styles.video}
          aria-label={`Trailer de ${tvshow.title}`}
        >
          <source src={tvshow.videoUrl} type="video/mp4" />
          O teu navegador não suporta vídeo.
        </video>
      )}

      <FavoriteButton tvshow={{ id: tvshow.id, title: tvshow.title }} />

      {hasEpisodes && (
        <EpisodeList episodes={tvshow.episodes!} />
      )}
    </div>
  );
}
export {}; // ← torna o ficheiro um módulo