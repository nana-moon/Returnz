import React from 'react';
import tw, { styled } from 'twin.macro';
import RankListItem from './RankListItem';

export default function ResultRank() {
  const users = [
    { rank: 1, profile: 'bear.jpg', nickname: 'j', returnRate: 10 },
    { rank: 2, profile: 'cat.jpg', nickname: 'i', returnRate: 10 },
    { rank: 3, profile: 'fox.jpg', nickname: 'a', returnRate: 10 },
    { rank: 4, profile: 'giraffe.jpg', nickname: 'e', returnRate: 10 },
  ];
  return (
    <RankContainer>
      <RankListItem user={users[0]} />
      <RankListItem user={users[1]} />
      <RankListItem user={users[2]} />
      <RankListItem user={users[3]} />
    </RankContainer>
  );
}

const RankContainer = styled.div`
  ${tw`flex flex-col justify-evenly`}
`;
