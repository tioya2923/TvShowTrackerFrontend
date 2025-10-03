import React, { useEffect, useState } from 'react';
import { Episode } from '../types/Episode';
import './EpisodeList.css';

interface EpisodeListProps {
  episodes: Episode[];
  showMetadataAfterFirst?: boolean;
}

export function EpisodeList({ episodes, showMetadataAfterFirst = false }: EpisodeListProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // valor inicial
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const estimatePageSize = () => {
      const cardHeight = 220;
      const cardWidth = 200;
      const availableHeight = window.innerHeight - 200;
      const availableWidth = window.innerWidth - 40;

      const rows = Math.max(1, Math.floor(availableHeight / cardHeight));
      const columns = Math.max(1, Math.floor(availableWidth / cardWidth));

      return rows * columns;
    };

    const newSize = estimatePageSize();
    setPageSize(newSize);
    setPage(1);
    setTotalPages(Math.ceil(episodes.length / newSize));
  }, [episodes]);

  const startIndex = (page - 1) * pageSize;
  const currentEpisodes = episodes.slice(startIndex, startIndex + pageSize);

  if (!Array.isArray(episodes) || episodes.length === 0) {
    return <p className="error">Nenhum episódio disponível.</p>;
  }

  return (
    <div className="episode-list-container">
      <ul className="episode-list">
        {currentEpisodes.map((ep, index) => (
          <li key={ep.id} className="episode-card">
            {ep.videoUrl && (
              <video controls preload="metadata" playsInline className="episode-video">
                <source src={ep.videoUrl} type="video/mp4" />
                O teu navegador não suporta vídeo HTML5.
              </video>
            )}
            <span className="episode-title">{ep.title}</span>
            {showMetadataAfterFirst && index === 0 && (
              <div className="metadata-placeholder" />
            )}
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Anterior</button>
          <span>Página {page} de {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Seguinte</button>
        </div>
      )}
    </div>
  );
}
