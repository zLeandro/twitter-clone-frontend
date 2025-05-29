import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e6f0ff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const Card = styled.div`
  background: white;
  padding: 2.5rem 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(29, 161, 242, 0.2);
  width: 360px;
  text-align: center;
`;

export const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: #1da1f2;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 12px 15px;
  margin-bottom: 15px;
  border: 1.8px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1da1f2;
    outline: none;
  }
`;

export const Button = styled.button`
  background-color: #1da1f2;
  color: white;
  padding: 12px 0;
  font-weight: 600;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0d8ddb;
  }
`;

export const ErrorMessage = styled.p`
  color: #e0245e;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 0;
`;

export const ToggleLink = styled.button`
  background: none;
  color: #1da1f2;
  border: none;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  margin-top: 15px;

  &:hover {
    text-decoration: none;
  }
`;