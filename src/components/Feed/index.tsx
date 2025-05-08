import React, { useState, useEffect } from 'react';
import {
  FeedContainer,
  PostCard,
  PostHeader,
  Avatar,
  PostContent,
  Actions,
  Username
} from './styles';

interface Post {
  id: number;
  conteudo: string;
  username: string;
  avatar?: string;
  total_likes: number;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/postagens/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Erro ao buscar postagens:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <FeedContainer>
      {posts.length === 0 ? (
        <p>Nenhuma postagem encontrada.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id}>
            <PostHeader>
              {post.avatar && <Avatar src={post.avatar} alt="avatar" />}
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