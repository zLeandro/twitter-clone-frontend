import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import api from '../services/api';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 10px;
  width: 280px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e6ecf0;
`;

const SidebarButton = styled(Link)`
  font-size: 18px;
  text-decoration: none;
  color: #333;
  padding: 12px;
  margin: 5px 0;
  width: 100%;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e6ecf0;
  transition: all 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const SkeletonLoader = styled.div`
  height: 42px;
  width: 100%;
  border-radius: 10px;
  background: linear-gradient(90deg, #f5f5f5 25%, #e9e9e9 37%, #f5f5f5 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const SearchInput = styled.input`
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 100%;
`;

const Sidebar: React.FC = () => {
  const [search, setSearch] = useState('');
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await api.get<{ username: string }>('/contas/perfil/');
        setUsername(res.data.username);
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  return (
    <SidebarContainer>
      <SearchInput
        type="text"
        placeholder="Buscar usuários..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SidebarButton to="/">Início</SidebarButton>

      {loading ? (
        <SkeletonLoader />
      ) : username ? (
        <SidebarButton to={`/perfil/${username}`}>Meu Perfil</SidebarButton>
      ) : (
        <SidebarButton to="/perfil">Meu Perfil</SidebarButton>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;