import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GlobalStyle from './globalStyles';
import LayoutPadrao from './components/LayoutPadrao';
import Feed from './components/Feed';
import EditProfile from './components/EditProfile';
import Profile from './components/Profile';
import Auth from './components/Auth';
import { PrivateRoute } from './components/Auth/PrivateRoute';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

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
          <Route path="/" element={<Feed />} />
          <Route path="/editar-perfil" element={<EditProfile />} />
          <Route path="/perfil" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;