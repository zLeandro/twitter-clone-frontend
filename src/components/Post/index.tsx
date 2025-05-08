import React, { useState } from 'react';

interface PostFormProps {
  addPost: (newPost: { conteudo: string; username: string }) => void;
}

const Post: React.FC<PostFormProps> = ({ addPost }) => {
  const [conteudo, setConteudo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = { conteudo, username: 'leandro' };
    addPost(newPost);
    setConteudo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
        placeholder="O que está acontecendo?"
      />
      <button type="submit">Postar</button>
    </form>
  );
};

export default Post;