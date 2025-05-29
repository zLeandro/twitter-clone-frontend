import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProfileContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
`;

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const Username = styled.h2`
  margin-top: 10px;
  font-size: 20px;
  color: #333;
`;

export const Bio = styled.p`
  font-size: 14px;
  color: #666;
  margin: 10px 0;
`;

export const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`;

export const StatItem = styled.div`
  font-size: 14px;
`;

export const EditButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #1da1f2;
  color: white;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    background-color: #0d8ddb;
  }
`;

export const FollowButton = styled.button`
  background-color: #1da1f2;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0d8ddb;
  }
`;