import React, { useState } from 'react';
import { api } from '../../api';
import styles from './ForgotPassword.module.css';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      await api.post('/user/forgot-password', { email });
      setSubmitted(true);
    } catch (error: any) {
      const message = error.response?.data || 'Erro desconhecido';
      setErrorMessage('Erro ao enviar email: ' + message);
    }
  };

  return (
    <div className={styles.forgotBackground}>
      <div className={styles.forgotOverlay}></div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2>Recuperar palavra-passe</h2>
        {errorMessage && (
          <div style={{ color: '#e67e22', textAlign: 'center', marginBottom: '10px' }}>
            {errorMessage}
          </div>
        )}
        {submitted ? (
          <p>Verifica o teu email para continuar a recuperação.</p>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <button type="submit">Enviar link de recuperação</button>
          </>
        )}
      </form>
    </div>
  );
}
export {}; // ← torna o ficheiro um módulo