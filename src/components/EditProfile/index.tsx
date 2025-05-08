import React, { useState } from 'react';
import {
  Container,
  Form,
  Input,
  TextArea,
  Label,
  SaveButton,
  Title,
} from './styles';

const EditProfile = () => {
  const [nome, setNome] = useState('Fulano');
  const [bio, setBio] = useState('Minha biografia');
  const [senha, setSenha] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nome:', nome);
    console.log('Biografia:', bio);
    console.log('Senha:', senha);
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
        />

        <Label>Foto de Perfil</Label>
        <Input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && (
          <img
            src={preview}
            alt="Prévia da foto de perfil"
            style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '20px' }}
          />
        )}

        <SaveButton type="submit">Salvar Alterações</SaveButton>
      </Form>
    </Container>
  );
};

export default EditProfile;