import React from 'react';
import tw, { styled } from 'twin.macro';
import { Avatar } from '@material-tailwind/react';

export default function TodayTopUserItem({ person, img }) {
  return (
    <TodayNewsContainer>
      <SubTitleText className="w-[5%] text-center">{img}</SubTitleText>
      <Avatar
        size="lg"
        variant="circular"
        src={`profile_pics/${person.profileIcon}.jpg`}
        className="my-auto ml-6 w-[15%]"
      />
      <TitleText>{person.nickname}</TitleText>
      <ContentText>{person.avgProfit}%</ContentText>
    </TodayNewsContainer>
  );
}

const TodayNewsContainer = styled.div`
  ${tw`py-1 px-6 my-2 flex`}
`;

const TitleText = styled.div`
  ${tw`text-lg font-bold my-auto pl-2 w-[70%]`}
`;

const SubTitleText = styled.div`
  ${tw`text-lg my-auto`}
`;

const ContentText = styled.div`
  ${tw`text-sm my-auto`}
`;
