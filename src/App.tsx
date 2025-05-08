import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GlobalStyle from './globalStyles';
import LayoutPadrao from './components/LayoutPadrao';
import Feed from './components/Feed';
import TweetInput from './components/TweetInput';
import EditProfile from './components/EditProfile';
import Profile from './components/Profile';
import Auth from './components/Auth';
import { PrivateRoute } from './components/Auth/PrivateRoute';

const App: React.FC = () => {
  const [tweet, setTweet] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  const handlePostTweet = async () => {
    if (tweet.trim()) {
      const token = localStorage.getItem('access_token');

      try {
        const response = await fetch('http://localhost:8000/api/postagens/criar/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ conteudo: tweet }),
        });

        if (response.ok) {
          const newPost = await response.json();
          setTweet('');
        } else {
          console.error('Erro ao criar postagem:', await response.json());
        }
      } catch (error) {
        console.error('Erro de rede ao criar postagem:', error);
      }
    }
  };

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />

        <Route
          element={
            <PrivateRoute>
              <LayoutPadrao />
            </PrivateRoute>
          }
        >
          <Route
            path="/"
            element={
              <>
                <TweetInput tweet={tweet} setTweet={setTweet} handlePostTweet={handlePostTweet} />
                <Feed />
              </>
            }
          />
          <Route path="/editar-perfil" element={<EditProfile />} />
          <Route path="/perfil" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;