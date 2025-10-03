import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>TvShowTracker</div>
      <ul className={styles.navLinks}>
        <li><Link to="/">Home</Link></li>
        {/*<li><Link to="/series">Séries</Link></li>*/}
          {/*<<li><Link to="/actors">Atores</Link></li>*/}
        <li><Link to="/favorites">Favoritos</Link></li>
         {/*<li><Link to="/login">Login</Link></li>*/}
         {/*<li><Link to="/register">Registo</Link></li>*/}
      </ul>
    </nav>
  );
}

export {}; // ← torna o ficheiro um módulo
