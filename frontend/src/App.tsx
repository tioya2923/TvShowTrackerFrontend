import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Register } from './pages/users/Register';
import { Login } from './pages/users/Login';
import { SeriesList } from './pages/series/SeriesList';
import { ForgotPassword } from './pages/users/ForgotPassword';
import { Favorites } from './pages/favorites/Favorites';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import styles from './AppLayout.module.css';
import { ActorsList } from './pages/actors/ActorsList';
import { ActorDetails } from './pages/actors/ActorDetails';
import { SeriesDetails } from './pages/series/SeriesDetails';
import { AuthContext, AuthProvider } from './context/AuthContext';

function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <div className={styles.wrapper}>
          <Navbar />
          <main className={styles.content}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/series" element={<SeriesList />} />
              <Route path="/series/:title" element={<SeriesDetails />} />
              <Route path="/actors" element={<ActorsList />} />
              <Route path="/actors/:id" element={<ActorDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/atores" element={<Navigate to="/actors" replace />} />
              <Route path="/atores/:id" element={<Navigate to="/actors/:id" replace />} />
              <Route path="/login" element={<Navigate to="/home" replace />} />
              <Route path="/register" element={<Navigate to="/home" replace />} />
              <Route path="/forgot-password" element={<Navigate to="/home" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<Navigate to="/login" replace />} />
          <Route path="/series" element={<Navigate to="/login" replace />} />
          <Route path="/series/:title" element={<SeriesDetails />} />
          <Route path="/actors" element={<Navigate to="/login" replace />} />
          <Route path="/actors/:id" element={<Navigate to="/login" replace />} />
          <Route path="/favorites" element={<Navigate to="/login" replace />} />
          <Route path="/atores" element={<Navigate to="/login" replace />} />
          <Route path="/atores/:id" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
