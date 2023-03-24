import React from 'react';
import tw, { styled } from 'twin.macro';
import RankListItem from './RankListItem';

export default function ResultRank() {
  const rankList = [
    { rank: 1, id: 1, profile: 'bear.jpg', nickname: 'chat혜성', profit: 10 },
    { rank: 2, id: 2, profile: 'cat.jpg', nickname: '꿀밤여경', profit: 10 },
    { rank: 3, id: 3, profile: 'fox.jpg', nickname: '기믹명진', profit: 10 },
    { rank: 4, id: 4, profile: 'giraffe.jpg', nickname: 'ㄱㅈㅇ', profit: 10 },
  ];
  return (
    <RankContainer>
      {rankList.map((user) => {
        return <RankListItem key={user.id} user={user} />;
      })}
    </RankContainer>
  );
}

const RankContainer = styled.div`
  ${tw`flex flex-col justify-evenly`}
`;
