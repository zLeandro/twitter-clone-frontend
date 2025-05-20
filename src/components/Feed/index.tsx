import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import {
  FeedContainer,
  PostCard,
  PostHeader,
  Avatar,
  PostContent,
  Actions,
  Username,
} from './styles';

import TweetInput from '../TweetInput';

interface PostData {
  id: number;
  conteudo: string;
  username: string;
  avatar?: string;
  total_likes: number;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [tweet, setTweet] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Busca as postagens com tipagem correta
  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get<PostData[]>('/postagens/listar/');
      setPosts(response.data);
    } catch (error) {
      console.error('Erro ao buscar postagens:', error);
      setErrorMessage('Erro ao carregar postagens.');
    }
  };

  // Envia novo tweet
  const handlePostTweet = async () => {
    if (!tweet.trim()) return;

    setErrorMessage('');
    try {
      const response = await axiosInstance.post<PostData>('/postagens/criar/', { conteudo: tweet });
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      setTweet('');
    } catch (error) {
      console.error('Erro ao postar:', error);
      setErrorMessage('Não foi possível postar.');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <FeedContainer>
      <TweetInput tweet={tweet} setTweet={setTweet} handlePostTweet={handlePostTweet} />

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {posts.length === 0 ? (
        <p>Nenhuma postagem encontrada.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id}>
            <PostHeader>
              {post.avatar && <Avatar src={post.avatar} alt={`${post.username} avatar`} />}
              <Username>{post.username}</Username>
            </PostHeader>
            <PostContent>{post.conteudo}</PostContent>
            <Actions>
              <button>❤️ Curtir</button>
              <button>💬 Comentar</button>
            </Actions>
          </PostCard>
        ))
      )}
    </FeedContainer>
  );
};

export default Feed;