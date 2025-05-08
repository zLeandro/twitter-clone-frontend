import styled from 'styled-components';

export const TweetInputContainer = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;
  max-width: 100%;
`;

export const TweetInputField = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #e1e8ed;
  border-radius: 20px;
  font-size: 14px;
  resize: none;
  box-sizing: border-box;
`;

export const PostButton = styled.button`
  background-color: #1da1f2;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  &:hover {
    background-color: #0d95e8;
  }
`;