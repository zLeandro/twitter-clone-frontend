import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import {
  FeedContainer,
  PostCard,
  PostHeader,
  Avatar,
  PostContent,
  Actions,
  Username,
  UsernameLink,
  CommentContainer,
  CommentTextarea,
  CommentButton,
  PostSkeleton,
} from './styles';
import TweetInput from '../TweetInput';

interface PostData {
  id: number;
  conteudo: string;
  username: string;
  avatar?: string;
  total_likes: number;
  curtido_por_mim: boolean;
}

interface CommentData {
  id: number;
  conteudo: string;
  username: string;
  avatar?: string;
  data_criacao: string;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [tweet, setTweet] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [commentingPostId, setCommentingPostId] = useState<number | null>(null);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState<Record<number, CommentData[]>>({});
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState<number[]>([]);
  const [avatarCache] = useState(new Map<string, string>());

  const loggedUsername = localStorage.getItem('username') || '';

  const getAvatarUrl = useCallback((avatar?: string): string => {
    if (!avatar) return 'https://via.placeholder.com/40x40.png?text=👤';

    if (avatarCache.has(avatar)) {
      return avatarCache.get(avatar)!;
    }

    const url = avatar.startsWith('http') ? avatar : `https://twitter-clone-htwu.onrender.com${avatar}`;
    avatarCache.set(avatar, url);
    return url;
  }, [avatarCache]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<PostData[]>('/postagens/listar/');
      setPosts(response.data);

      response.data.forEach(post => {
        if (post.avatar) {
          const img = new Image();
          img.src = getAvatarUrl(post.avatar);
        }
      });
    } catch (error) {
      console.error('Erro ao buscar postagens:', error);
      setErrorMessage('Erro ao carregar postagens.');
      setTimeout(fetchPosts, 4000);
    } finally {
      setLoading(false);
    }
  }, [getAvatarUrl]);


  const fetchCommentsForPost = useCallback(async (postId: number) => {
    if (comments[postId]) return;

    setLoadingComments(prev => [...prev, postId]);
    try {
      const response = await axiosInstance.get<CommentData[]>(`/comentarios/${postId}/comentarios/`);
      setComments(prev => ({ ...prev, [postId]: response.data }));
    } catch (error) {
      console.error(`Erro ao buscar comentários do post ${postId}`, error);
    } finally {
      setLoadingComments(prev => prev.filter(id => id !== postId));
    }
  }, [comments]);

  const handlePostTweet = useCallback(async () => {
    if (!tweet.trim()) return;

    setErrorMessage('');
    try {
      const response = await axiosInstance.post<PostData>('/postagens/criar/', {
        conteudo: tweet,
      });

      setPosts(prevPosts => [response.data, ...prevPosts]);
      setTweet('');
    } catch (error) {
      console.error('Erro ao postar:', error);
      setErrorMessage('Não foi possível postar.');
    }
  }, [tweet]);

  const handleLikeToggle = useCallback(async (postId: number) => {
    setPosts(prevPosts => {
      const updatedPosts = prevPosts.map(p =>
        p.id === postId
          ? {
              ...p,
              total_likes: p.curtido_por_mim ? p.total_likes - 1 : p.total_likes + 1,
              curtido_por_mim: !p.curtido_por_mim
            }
          : p
      );
      return updatedPosts;
    });

    try {
      const post = posts.find(p => p.id === postId);
      if (post?.curtido_por_mim) {
        await axiosInstance.post(`/postagens/${postId}/descurtir/`);
      } else {
        await axiosInstance.post(`/postagens/${postId}/curtir/`);
      }
    } catch (error) {
      console.error('Erro ao curtir/descurtir:', error);
      setPosts(prevPosts => [...prevPosts]);
    }
  }, [posts]);

  const handleCommentToggle = useCallback(async (postId: number) => {
    if (commentingPostId === postId) {
      setCommentingPostId(null);
      setCommentContent('');
    } else {
      setCommentingPostId(postId);
      setCommentContent('');
      fetchCommentsForPost(postId);
    }
  }, [commentingPostId, fetchCommentsForPost]);

  const handleCommentSubmit = useCallback(async (postId: number) => {
    if (!commentContent.trim()) return;

    try {
      const response = await axiosInstance.post<CommentData>(
        `/comentarios/${postId}/comentar/`,
        { conteudo: commentContent }
      );

      setComments(prev => ({
        ...prev,
        [postId]: prev[postId] ? [response.data, ...prev[postId]] : [response.data],
      }));

      setCommentContent('');
    } catch (error) {
      console.error('Erro ao comentar:', error);
    }
  }, [commentContent]);

  useEffect(() => {
    fetchPosts();

    const interval = setInterval(fetchPosts, 30000);
    return () => clearInterval(interval);
  }, [fetchPosts]);

  return (
    <FeedContainer>
      <TweetInput
        tweet={tweet}
        setTweet={setTweet}
        handlePostTweet={handlePostTweet}
      />

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {loading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : posts.length === 0 ? (
        <p>Nenhuma postagem encontrada.</p>
      ) : (
        posts.map(post => (
          <PostCard key={post.id}>
            <PostHeader>
              <Avatar
                src={getAvatarUrl(post.avatar)}
                alt={`${post.username} avatar`}
                loading="lazy"
              />
              <Username>
                <UsernameLink to={post.username === loggedUsername ? '/perfil' : `/perfil/${post.username}`}>
                  {post.username}
                </UsernameLink>
              </Username>
            </PostHeader>

            <PostContent>{post.conteudo}</PostContent>

            <Actions>
              <button onClick={() => handleLikeToggle(post.id)}>
                {post.curtido_por_mim ? (
                  <span role="img" aria-label="curtido">💙 Curtiu ({post.total_likes})</span>
                ) : (
                  <span role="img" aria-label="curtir">🤍 Curtir ({post.total_likes})</span>
                )}
              </button>

              <button onClick={() => handleCommentToggle(post.id)}>
                <span role="img" aria-label="comentar">💬 Comentar</span>
              </button>
            </Actions>

            {commentingPostId === post.id && (
              <CommentContainer>
                <CommentTextarea
                  placeholder="Digite seu comentário..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
                <CommentButton onClick={() => handleCommentSubmit(post.id)}>
                  Enviar
                </CommentButton>

                {loadingComments.includes(post.id) ? (
                  <div style={{ marginTop: '10px' }}>Carregando comentários...</div>
                ) : comments[post.id]?.length ? (
                  comments[post.id].map(comment => (
                    <div key={comment.id} style={{
                      marginTop: 10,
                      paddingTop: 8,
                      borderTop: '1px solid #eee',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}>
                      <img
                        src={getAvatarUrl(comment.avatar)}
                        alt={`${comment.username} avatar`}
                        style={{ width: 32, height: 32, borderRadius: '50%' }}
                        loading="lazy"
                      />
                      <div>
                        <strong>{comment.username}</strong>{' '}
                        <small style={{ color: '#666' }}>
                          {new Date(comment.data_criacao).toLocaleString()}
                        </small>
                        <p>{comment.conteudo}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ marginTop: 8, fontStyle: 'italic' }}>Nenhum comentário ainda.</p>
                )}
              </CommentContainer>
            )}
          </PostCard>
        ))
      )}
    </FeedContainer>
  );
};

export default Feed;