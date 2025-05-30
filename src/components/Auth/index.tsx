import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Card,
  Title,
  Form,
  Input,
  Button,
  ErrorMessage,
  ToggleLink,
} from './styles';

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

  const handleLoginWithCredentials = async (username: string, password: string) => {
    try {
      const response = await axios.post<LoginResponse>('https://twitter-clone-htwu.onrender.com/api/token/', {
        username,
        password,
      });

      const { access, refresh } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      setIsAuthenticated(true);
      navigate('/');
    } catch {
      setError('Usuário ou senha inválidos');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    await handleLoginWithCredentials(username.trim(), password.trim());
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('https://twitter-clone-htwu.onrender.com/api/contas/registrar/', {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });
      await handleLoginWithCredentials(username.trim(), password.trim());
    } catch (error: any) {
      if (error.response?.status === 400) {
        const data = error.response.data;
        const messages = Object.values(data).flat().join(' ');
        setError(messages);
      } else {
        setError('Erro ao cadastrar usuário');
      }
    }
  };

  return (
    <Container>
      <Card>
        <Title>{isLogin ? 'Login' : 'Cadastro'}</Title>
        <Form onSubmit={isLogin ? handleLogin : handleRegister}>
          <Input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {!isLogin && (
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">{isLogin ? 'Entrar' : 'Cadastrar'}</Button>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ToggleLink
          onClick={() => {
            setError('');
            setIsLogin(!isLogin);
          }}
        >
          {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
        </ToggleLink>
      </Card>
    </Container>
  );
};

export default Auth;