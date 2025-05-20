import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const agora = Math.floor(Date.now() / 1000);
    return payload.exp > agora;
  } catch {
    return false;
  }
}

interface RefreshResponse {
  access: string;
}

async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) throw new Error('Sem refresh token');

  try {
    const response = await axios.post<RefreshResponse>('http://localhost:8000/api/token/refresh/', {
      refresh: refreshToken,
    });
    const { access } = response.data;
    localStorage.setItem('access_token', access);
    return access;
  } catch (error) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    throw error;
  }
}

axiosInstance.interceptors.request.use(
  async (config: any) => {
    let token = localStorage.getItem('access_token');

    if (!isTokenValid(token)) {
      try {
        token = await refreshAccessToken();
      } catch (err) {
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;