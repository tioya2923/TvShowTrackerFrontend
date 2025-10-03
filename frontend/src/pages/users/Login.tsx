import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import styles from './Login.module.css';
import { AuthContext } from '../../context/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await api.post('/user/login', {
        email,
        password,
      });

      const { token, profile } = response.data;

      localStorage.setItem('userProfile', JSON.stringify(profile));
      login(token);

      navigate('/home', { replace: true });
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        'Email ou palavra-passe incorretos.';
      setErrorMessage(message);
    }
  };

  return (
    <div className={styles.loginBackground}>
      <div className={styles.loginOverlay}></div>
      <div className={styles.logo}>TvShowTracker</div>
      <form onSubmit={handleLogin} className={styles.formContainer}>
        <h2>Login</h2>

     
        {errorMessage && (
          <div className={styles.error}>
            <span className={styles.errorIcon}>⚠️</span>
            {errorMessage}
          </div>
        )}


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
          placeholder="Palavra-passe"
          required
        />
        <button type="submit">Entrar</button>
        <p>
          <a href="/forgot-password">Esqueceste-te da palavra-passe?</a>
        </p>
        <p>
          <a href="/register">Regista-te no TvShowTracker</a>
        </p>
      </form>
    </div>
  );
}