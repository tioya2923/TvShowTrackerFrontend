import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api';
import { Actor } from '../../types/Actor';
import styles from './ActorsList.module.css';

export function ActorsList() {
  const [actors, setActors] = useState<Actor[]>([]);

  useEffect(() => {
    api.get('/actors')
      .then(res => {
        console.log('Resposta da API:', res.data);
        const lista = res.data.$values ?? [];
        setActors(lista);
      })
      .catch(err => console.error('Erro ao carregar atores', err));
  }, []);

  return (
    <div>
      <h1>Atores</h1>
      {actors.length === 0 ? (
        <p>Nenhum ator encontrado.</p>
      ) : (
        actors.map(actor => (
          <div key={actor.id} className={styles.actorCard}>
            <Link to={`/atores/${actor.id}`} className={styles.actorLink}>
              {actor.photoUrl && (
                <img
                  src={actor.photoUrl}
                  alt={`Foto de ${actor.name}`}
                  className={styles.actorPhoto}
                />
              )}
              <strong>{actor.name}</strong>
            </Link>
            <br />
            <small>
              Nascimento: {new Date(actor.birthDate).toLocaleDateString('pt-PT')}
            </small>
          </div>
        ))
      )}
    </div>
  );
}
