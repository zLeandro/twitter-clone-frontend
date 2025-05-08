import React from 'react';
import { TweetInputContainer, TweetInputField, PostButton } from './styles';

interface TweetInputProps {
  tweet: string;
  setTweet: React.Dispatch<React.SetStateAction<string>>;
  handlePostTweet: () => void;
}

const TweetInput: React.FC<TweetInputProps> = ({ tweet, setTweet, handlePostTweet }) => {
  return (
    <TweetInputContainer>
      <TweetInputField
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        placeholder="O que está acontecendo?"
      />
      <PostButton onClick={handlePostTweet}>Tweetar</PostButton>
    </TweetInputContainer>
  );
};

export default TweetInput;