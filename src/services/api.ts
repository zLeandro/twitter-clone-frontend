import axios from 'axios';

const api = axios.create({
  baseURL: 'https://twitter-clone-htwu.onrender.com/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;