import { FavoriteMinimal } from '../types/FavoriteMinimal';

const FAVORITES_KEY = 'favoriteSeries';

export function getFavorites(): FavoriteMinimal[] {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function isFavorite(id: number): boolean {
  return getFavorites().some(s => s.id === id);
}

export function addFavorite(tvshow: FavoriteMinimal) {
  const updated = [...getFavorites(), tvshow];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export function removeFavorite(id: number) {
  const updated = getFavorites().filter(s => s.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}
