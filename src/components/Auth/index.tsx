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

const Auth: React.FC<AuthProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Função separada para login com username e password como argumentos
  const handleLoginWithCredentials = async (username: string, password: string) => {
    try {
      const response = await axios.post<LoginResponse>('http://localhost:8000/api/token/', {
        username,
        password,
      });

      const { access, refresh } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      setError('Usuário ou senha inválidos');
    }
  };

  // Função de login ligada ao form, só previne o comportamento padrão e chama a função acima
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    await handleLoginWithCredentials(username.trim(), password.trim());
  };

  // Função de cadastro, que chama o login com as credenciais se der certo
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:8000/api/contas/registrar/', {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });
      // Após registrar, já faz o login automático
      await handleLoginWithCredentials(username.trim(), password.trim());
    } catch (error: any) {
      console.error('Erro de cadastro:', error.response?.data);

      if (error.response?.status === 400) {
        const data = error.response.data;
        // Converte mensagens do backend para string única
        const messages = Object.values(data)
          .flat()
          .join(' ');
        setError(messages);
      } else {
        setError('Erro ao cadastrar usuário');
      }
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Cadastro'}</h1>
      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? 'Entrar' : 'Cadastrar'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button
        onClick={() => {
          setError('');
          setIsLogin(!isLogin);
        }}
      >
        {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
      </button>
    </div>
  );
};

export default Auth;