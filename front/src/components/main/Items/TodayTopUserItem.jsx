import React from 'react';
import tw, { styled } from 'twin.macro';
import { Avatar } from '@material-tailwind/react';

export default function TodayTopUserItem({ person }) {
  // const rankIcon = ['🥇', '🥈', '🥉', '💸'];
  const myPic = 'C';
  const picPath = `profile_pics/${myPic}.jpg`;
  return (
    <TodayNewsContainer>
      <SubTitleText>🥇</SubTitleText>
      <Avatar size="lg" variant="circular" src={picPath} className="my-auto" />
      <UserInfoBox>
        <TitleText>닉네임이제일긴사람임</TitleText>
        <ContentText>수익률: 300000%</ContentText>
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
