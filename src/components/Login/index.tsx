import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginResponse {
  access: string;
  refresh: string;
}

interface AuthProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<AuthProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://twitter-clone-htwu.onrender.com/api/token/', {
        username,
        password,
      });

      const { access, refresh } = response.data as LoginResponse;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuário"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <button type="submit">Entrar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;