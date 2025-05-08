import React from 'react';
import {
  ProfileContainer,
  Avatar,
  Username,
  Bio,
  Stats,
  StatItem,
  EditButton,
} from './styles';

const Perfil: React.FC = () => {
  return (
    <ProfileContainer>
      <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" alt="Avatar" />
      <Username>@usuario</Username>
      <Bio>Esta é a biografia do usuário.</Bio>

      <Stats>
        <StatItem><strong>123</strong> seguidores</StatItem>
        <StatItem><strong>456</strong> seguindo</StatItem>
        <StatItem><strong>10</strong> postagens</StatItem>
      </Stats>

      <EditButton to="/editar-perfil">Editar perfil</EditButton>
    </ProfileContainer>
  );
};

export default Perfil;