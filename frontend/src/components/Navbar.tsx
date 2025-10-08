import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

export function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>TvShowTracker</div>
      <ul className={styles.navLinks}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/favorites">Favoritos</Link></li>
     
      </ul>
    </nav>
  );
}

export {};



{/* 
     {isAuthenticated && (
          <>
            <li>
              <a
                href={`${process.env.REACT_APP_API_BASE_URL}/export/pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Export PDF
              </a>
            </li>
            <li>
              <a
                href={`${process.env.REACT_APP_API_BASE_URL}/export/csv`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Export CSV
              </a>
            </li>
          </>
        )}

*/}