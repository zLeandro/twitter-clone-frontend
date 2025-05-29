import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Form,
  Input,
  TextArea,
  Label,
  SaveButton,
  Title,
} from './styles';

interface UserStats {
  seguidores: number;
  seguindo: number;
  postagens: number;
}

interface UserProfile {
  id?: number;
  username: string;
  bio?: string;
  profile_picture?: string;
  stats?: UserStats;
  is_me?: boolean;
  is_following?: boolean;
}

interface EditProfileProps {
  perfil: UserProfile;
  onSave: (perfilAtualizado: UserProfile) => void;
}

const API_BASE_URL = 'http://localhost:8000';

const EditProfile: React.FC<EditProfileProps> = ({ perfil, onSave }) => {
  const [nome, setNome] = useState<string>(perfil.username);
  const [bio, setBio] = useState<string>(perfil.bio || '');
  const [senha, setSenha] = useState<string>('');
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (perfil.profile_picture) {
      setPreview(
        perfil.profile_picture.startsWith('http')
          ? perfil.profile_picture
          : `${API_BASE_URL}${perfil.profile_picture}`
      );
    }
  }, [perfil.profile_picture]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('username', nome);
    formData.append('bio', bio);
    if (senha) formData.append('password', senha);
    if (foto) formData.append('profile_picture', foto);

    try {
      const res = await axios.put<UserProfile>(
        `${API_BASE_URL}/api/contas/perfil/editar/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      alert('Perfil atualizado com sucesso!');
      onSave(res.data);
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Editar Perfil</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Nome</Label>
        <Input value={nome} onChange={(e) => setNome(e.target.value)} />

        <Label>Biografia</Label>
        <TextArea value={bio} onChange={(e) => setBio(e.target.value)} />

        <Label>Nova Senha</Label>
        <Input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Deixe vazio para não alterar"
        />

        <Label>Foto de Perfil</Label>
        <Input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && (
          <img
            src={preview}
            alt="Prévia da foto de perfil"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              marginBottom: '20px',
            }}
          />
        )}

        <SaveButton type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </SaveButton>
      </Form>
    </Container>
  );
};

export default EditProfile;