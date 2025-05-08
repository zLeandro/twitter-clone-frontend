import styled from 'styled-components';

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