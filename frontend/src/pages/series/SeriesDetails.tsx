import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api';
import { TvShowDetailed } from '../../types/TvShowDetailed';
import { FavoriteButton } from '../../components/FavoriteButton';
import { EpisodeList } from '../../components/EpisodeList';
import styles from './SeriesDetails.module.css';
import { Actor } from '../../types/Actor';
import { Genre } from '../../types/Genre';
//import { Episode } from '../../types/Episode';

export function SeriesDetails() {
  const { title } = useParams();

  const [tvshow, setTvShow] = useState<TvShowDetailed | null>(null);

  useEffect(() => {
    if (!title) return;

    api.get(`/tvshows/by-title/${encodeURIComponent(title)}`)
      .then(res => {
        const data = res.data;
        const genres = data.genres?.$values ?? data.genres ?? [];
        const actors = data.actors?.$values ?? data.actors ?? [];
        const episodes = data.episodes?.$values ?? data.episodes ?? [];

        setTvShow({ ...data, genres, actors, episodes });
      })
      .catch(err => console.error('Erro ao carregar detalhes da série', err));
  }, [title]);


  if (!tvshow) return <p>A carregar...</p>;

  return (
    <div className={styles.container}>

      {tvshow.episodes.length > 0 && (
        <EpisodeList episodes={tvshow.episodes} showMetadataAfterFirst />
      )}

      {/* Metadados aparecem depois do primeiro episódio */}
      <div className={styles.metadata}>
        <p><strong>Descrição:</strong> {tvshow.description}</p>

        {tvshow.genres.length > 0 && (
          <p>
            <strong>Géneros:</strong>{' '}
            {tvshow.genres.map((g: Genre) => g.name).join(', ')}
          </p>
        )}

        {tvshow.actors.length > 0 && (
          <div>
            <strong>Atores:</strong>
            <ul>
              {tvshow.actors.map((actor: Actor) => (
                <li key={actor.id}>{actor.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/*  Botão de favoritos movido para aqui */}
        <div className={styles.favoriteBtnWrapper}>
          <FavoriteButton tvshow={tvshow} />
        </div>
      </div>
    </div>
  );
}
