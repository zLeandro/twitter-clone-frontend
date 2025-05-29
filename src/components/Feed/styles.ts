import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export const PostCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }
`;

export const PostSkeleton = styled.div`
  height: 120px;
  width: 100%;
  border-radius: 16px;
  background: linear-gradient(90deg, #f5f5f5 25%, #e9e9e9 37%, #f5f5f5 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  border: 2px solid #e1e8ed;
  object-fit: cover;
`;

export const Username = styled.h3`
  font-size: 18px;
  color: #333;
  font-weight: 600;
`;

export const PostContent = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 12px;
  line-height: 1.5;
`;

export const Actions = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #1da1f2;
    font-weight: 600;
    padding: 5px 10px;
    border-radius: 20px;
    transition: background 0.3s ease;

    &:hover {
      background: #f0f8ff;
    }
  }
`;

export const UsernameLink = styled(Link)`
  font-size: 18px;
  color: #333;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: #1da1f2;
    text-decoration: underline;
  }
`;

export const CommentContainer = styled.div`
  margin-top: 8px;
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
  font-size: 14px;
  font-family: inherit;
`;

export const CommentButton = styled.button`
  margin-top: 6px;
  padding: 8px 12px;
  border-radius: 20px;
  border: none;
  background-color: #1da1f2;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0d8ddb;
  }
`;