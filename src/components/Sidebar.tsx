import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  border-radius: 4px;
  transition: background-color 0.3s;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e6ecf0;

  &:hover {
    background-color: #007bff;
    color: white;
  }
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

  return (
    <SidebarContainer>
      <SearchInput
        type="text"
        placeholder="Buscar usuários..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SidebarButton to="/">Início</SidebarButton>
      <SidebarButton to="/perfil">Perfil</SidebarButton>

    </SidebarContainer>
  );
};

export default Sidebar;