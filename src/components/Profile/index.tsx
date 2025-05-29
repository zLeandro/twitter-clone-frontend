import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
  ProfileContainer,
  Avatar,
  Username,
  Bio,
  Stats,
  StatItem,
  FollowButton,
} from './styles';
import EditProfile from '../EditProfile';

interface UserStats {
  seguidores: number;
  seguindo: number;
  postagens: number;
}

interface UserProfile {
  id: number;
  username: string;
  bio?: string;
  profile_picture?: string;
  stats: UserStats;
  is_me: boolean;
  is_following: boolean;
}

const Profile: React.FC = () => {
  const { username: urlUsername } = useParams<{ username?: string }>();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [seguindo, setSeguindo] = useState(false);
  const [editando, setEditando] = useState(false);

  const fetchPerfil = async () => {
    setLoading(true);
    try {
      const endpoint = urlUsername
        ? `/contas/perfil/${urlUsername}/`
        : `/contas/perfil/`;

      const res = await api.get<UserProfile>(endpoint);
      setPerfil(res.data);
      setSeguindo(res.data.is_following);
    } catch (err) {
      console.error('Erro ao carregar perfil:', err);
      setPerfil(null);
      if (!urlUsername) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerfil();
  }, [urlUsername]);

  const toggleFollow = async () => {
    if (!perfil || !perfil.id) return;

    const novoEstadoSeguindo = !seguindo;
    setSeguindo(novoEstadoSeguindo);
    setPerfil(prev => prev ? {
      ...prev,
      stats: {
        ...prev.stats,
        seguidores: novoEstadoSeguindo ? prev.stats.seguidores + 1 : prev.stats.seguidores - 1
      },
      is_following: novoEstadoSeguindo
    } : null);

    try {
      const endpoint = novoEstadoSeguindo
        ? `/contas/seguir/${perfil.id}/`
        : `/contas/desseguir/${perfil.id}/`;
      await api.post(endpoint);
    } catch (error) {
      console.error('Erro ao atualizar seguimento:', error);
      setSeguindo(!novoEstadoSeguindo);
      setPerfil(prev => prev ? {
        ...prev,
        stats: {
          ...prev.stats,
          seguidores: !novoEstadoSeguindo ? prev.stats.seguidores + 1 : prev.stats.seguidores - 1
        },
        is_following: !novoEstadoSeguindo
      } : null);
    }
  };

  const handleSave = (novoPerfil: UserProfile) => {
    setPerfil(novoPerfil);
    setEditando(false);
    navigate('/perfil');
  };

  if (loading) return <div>Carregando perfil...</div>;
  if (!perfil) return <div>Perfil não encontrado</div>;

  return (
    <ProfileContainer>
      <Avatar
        src={perfil.profile_picture || 'https://randomuser.me/api/portraits/lego/1.jpg'}
        alt="Avatar"
      />
      <Username>@{perfil.username}</Username>
      <Bio>{perfil.bio || 'Sem biografia ainda.'}</Bio>

      <Stats>
        <StatItem><strong>{perfil.stats?.seguidores ?? 0}</strong> seguidores</StatItem>
        <StatItem><strong>{perfil.stats?.seguindo ?? 0}</strong> seguindo</StatItem>
        <StatItem><strong>{perfil.stats?.postagens ?? 0}</strong> postagens</StatItem>
      </Stats>

      {perfil.is_me ? (
        <>
          <FollowButton onClick={() => setEditando(!editando)}>
            {editando ? 'Cancelar' : 'Editar perfil'}
          </FollowButton>
          {editando && <EditProfile perfil={perfil} onSave={handleSave} />}
        </>
      ) : (
        <FollowButton onClick={toggleFollow}>
          {seguindo ? 'Deixar de seguir' : 'Seguir'}
        </FollowButton>
      )}
    </ProfileContainer>
  );
};

export default Profile;