import React, { useEffect, useState } from 'react';
import { FavoriteMinimal } from '../../types/FavoriteMinimal';
import { getFavorites } from '../../utils/favorites';
import { TvShowCard } from '../../components/TvShowCard';
import styles from './Favorites.module.css';

export function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteMinimal[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <div className={styles.container}>
      <h1>Favoritos</h1>
      {favorites.length === 0 ? (
        <p>Nenhuma série favorita ainda.</p>
      ) : (
        <ul>
          {favorites.map(show => (
            <li key={show.id}>
              <TvShowCard tvshow={show} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}