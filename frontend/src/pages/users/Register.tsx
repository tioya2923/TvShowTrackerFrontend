import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import styles from './Register.module.css';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [consentGiven, setConsentGiven] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      await api.post('/user/register', {
        email,
        password,
        name,
        consentGiven,
      });

      navigate('/login', { replace: true });
    } catch (error: any) {
      const message = error.response?.data || 'Erro desconhecido';

      if (typeof message === 'string' && message.includes('email')) {
        setErrorMessage('Este email já está registado. Por favor, faz login.');
      } else {
        setErrorMessage(message);
      }
    }
  };

  return (
    <div className={styles.registerBackground}>
      <div className={styles.logo}>TvShowTracker</div>
      <div className={styles.registerOverlay}></div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2>Registo</h2>

        {errorMessage && (
          <div className={styles.error}>
            <span className={styles.errorIcon}>⚠️</span>
            {errorMessage}
            {errorMessage.includes('email') && (
              <p>
                <a href="/login">Ir para login</a>
              </p>
            )}
          </div>
        )}

        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nome"
          required
        />

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <label>
          <input
            type="checkbox"
            checked={consentGiven}
            onChange={e => setConsentGiven(e.target.checked)}
          />
          Aceito os termos
        </label>

        <button type="submit">Registar</button>

        <p>
          <a href="/login">Já tens uma conta?</a>
        </p>
      </form>
    </div>
  );
}
