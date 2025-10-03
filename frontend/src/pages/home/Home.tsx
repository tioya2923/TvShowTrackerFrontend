import React from 'react';
import styles from './Home.module.css';
import { SeriesList } from '../series/SeriesList';

export function Home() {
  return (
    <div className={styles.gridContainer}>
      <SeriesList/>
    </div>
  )
}
