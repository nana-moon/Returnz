import React from 'react';
import tw, { styled } from 'twin.macro';
import { Avatar } from '@material-tailwind/react';

export default function TodayTopUserItem({ person }) {
  // const rankIcon = ['🥇', '🥈', '🥉', '💸'];
  return (
    <TodayNewsContainer>
      <SubTitleText>🥇</SubTitleText>
      <Avatar size="lg" variant="circular" src={`profile_pics/${person.profileIcon}.jpg`} className="my-auto" />
      <UserInfoBox>
        <TitleText>{person.nickname}</TitleText>
        <ContentText>{person.avgProfit}</ContentText>
      </UserInfoBox>
    </TodayNewsContainer>
  );
}

const TodayNewsContainer = styled.div`
  ${tw`bg-white border-2 border-negative rounded-lg py-1 px-2 my-2 flex`}
`;

const TitleText = styled.div`
  ${tw`text-lg`}
`;

const UserInfoBox = styled.div`
  ${tw`my-auto`}
`;
const SubTitleText = styled.div`
  ${tw`text-lg my-auto`}
`;

const ContentText = styled.div`
  ${tw`text-sm`}
`;
