import React from 'react';
import { useAuth } from '../context/AuthContext'; // Make sure this is available
import styles from './Footer.module.css';

export function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} TvShowTracker. Todos os direitos reservados.</p>
      <div className={styles.links}>
        <a href="/privacy">Privacidade</a>
        <a href="/terms">Termos</a>
        <a href="/contact">Contacto</a>

        {isAuthenticated && (
          <>
            <a
              href={`${process.env.REACT_APP_API_URL}/export/pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Exportar PDF
            </a>
            <a
              href={`${process.env.REACT_APP_API_URL}/export/csv`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Exportar CSV
            </a>
          </>
        )}
      </div>
    </footer>
  );
}
