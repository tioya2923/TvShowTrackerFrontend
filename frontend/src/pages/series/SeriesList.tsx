import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import { TvShow } from '../../types/TvShow';
import styles from './SeriesList.module.css';
import { Link } from 'react-router-dom';

export function SeriesList() {
  const [tvshows, setTvShows] = useState<TvShow[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estima quantos itens cabem na tela com base na altura e largura
  const estimatePageSize = () => {
    const cardHeight = 300; // altura estimada por card
    const cardWidth = 240;  // largura estimada por card
    const availableHeight = window.innerHeight - 200; // margem para cabeçalho, etc.
    const availableWidth = window.innerWidth - 40;

    const rows = Math.max(1, Math.floor(availableHeight / cardHeight));
    const columns = Math.max(1, Math.floor(availableWidth / cardWidth));

    return rows * columns;
  };

  const fetchData = (currentPage: number) => {
    const pageSize = estimatePageSize();
    setLoading(true);

    api.get(`/tvshows/paged?page=${currentPage}&pageSize=${pageSize}`)
      .then(res => {
        const rawItems = res.data?.items?.$values ?? [];
        const items = Array.isArray(rawItems) ? rawItems : [];

        const pages = typeof res.data?.totalPages === 'number'
          ? res.data.totalPages
          : 1;

        setTvShows(items);
        setTotalPages(pages);
        setError(null);
      })
      .catch(err => {
        console.error('Erro ao carregar séries', err);
        setError('Não foi possível carregar as séries.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Atualiza ao redimensionar a janela
  useEffect(() => {
    const handleResize = () => {
      setPage(1); // Reinicia na primeira página
      fetchData(1);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (

      <div className={styles.container}>
        {loading && <p>A carregar...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!loading && !error && tvshows.length === 0 && (
          <p>Nenhuma série encontrada.</p>
        )}

        {tvshows.map((show, index) => (
          <div key={show.id ?? index} className={styles.card}>
            <Link to={`/series/${encodeURIComponent(show.title)}`} className={styles.link}>

              <img
                src={show.imageUrl}
                alt={`Imagem de ${show.title}`}
                className={styles.image}
              />
              <h2 className={styles.title}>{show.title}</h2>
            </Link>
          </div>
        ))}

        {/* Só mostra a paginação se houver mais de uma página */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Anterior</button>
            <span>Página {page} de {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Seguinte</button>
          </div>
        )}
      </div>
  
  );
}

export { }; // ← torna o ficheiro um módulo
