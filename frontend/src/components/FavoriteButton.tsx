import React, { useState, useEffect } from 'react';
import { isFavorite, addFavorite, removeFavorite } from '../utils/favorites';

interface FavoriteButtonProps {
  tvshow: {
    id: number;
    title: string;
  };
}

export function FavoriteButton({ tvshow }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(tvshow.id));
  }, [tvshow.id]);

  const toggleFavorite = () => {
    if (favorited) {
      removeFavorite(tvshow.id);
    } else {
      addFavorite(tvshow);
    }
    setFavorited(!favorited);
  };

  return (
    <button onClick={toggleFavorite}>
      {favorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
    </button>
  );
}
