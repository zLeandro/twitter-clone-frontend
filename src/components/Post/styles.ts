import styled from 'styled-components';

export const PostContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px; /* tamanho card */
  margin-left: auto;
  margin-right: auto;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const PostContent = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 15px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
`;

export const Button = styled.button`
  background-color: #e1e8ed;
  color: #1da1f2;
  border: none;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ccd6dd;
  }
`;

export const CommentInput = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #e1e8ed;
  border-radius: 10px;
  font-size: 14px;
  resize: none;
`;

export const CommentSection = styled.div`
  margin-top: 15px;
`;

export const CommentCard = styled.div`
  background-color: #f7f7f7;
  border: 1px solid #e1e8ed;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const CommentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
`;

export const CommentAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const CommentText = styled.p`
  font-size: 13px;
  color: #333;
`;