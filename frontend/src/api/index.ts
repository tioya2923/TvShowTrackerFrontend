import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:5111/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.set?.('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  error => Promise.reject(error)
);
