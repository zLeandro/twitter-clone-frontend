import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // URL do seu backend Django
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;