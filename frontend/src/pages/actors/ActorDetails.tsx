import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api';
import { Actor } from '../../types/Actor';
import Style from './ActorDetails.module.css';

export function ActorDetails() {
  const { id } = useParams();
  const [actor, setActor] = useState<Actor | null>(null);

  useEffect(() => {
    if (!id) return;

    api.get(`/actors/${id}`)
      .then(res => {
        console.log('Ator carregado:', res.data);
        setActor(res.data);
      })
      .catch(err => console.error('Erro ao carregar ator', err));
  }, [id]);

  if (!actor) return <p>Carregando...</p>;

  return (
    <div className={Style.actorDetailsContainer}>
      <img
        src={actor.photoUrl ?? '/imagens/sem-foto.png'}
        alt={`Foto de ${actor.name}`}
        className={Style.actorPhoto}
      />

      <h1 className={Style.actorName}>{actor.name}</h1>

      {actor.birthDate && (
        <p className={Style.actorBirthday}>
          Nascimento: {new Date(actor.birthDate).toLocaleDateString('pt-PT')}
        </p>
      )}

      <p className={Style.actorBio}>
        {actor.biography ?? 'Biografia não disponível.'}
      </p>

      {Array.isArray(actor.series?.$values) && actor.series.$values.length > 0 && (
        <div className={Style.actorShowsList}>
          <h2 className={Style.actorShowsTitle}>Séries</h2>
          {actor.series.$values.map((s: any) => (
            <div key={s.id} className={Style.actorShowItem}>
              {s.imageUrl && (
                <img
                  src={s.imageUrl}
                  alt={s.title}
                  className={Style.actorShowImage}
                />
              )}
              <span className={Style.actorShowName}>{s.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
