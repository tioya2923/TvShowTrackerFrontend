import React from 'react';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} TvShowTracker. Todos os direitos reservados.</p>
      <div className={styles.links}>
        <a href="/privacy">Privacidade</a>
        <a href="/terms">Termos</a>
        <a href="/contact">Contacto</a>
      </div>
    </footer>
  );
}
