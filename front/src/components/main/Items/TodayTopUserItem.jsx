import React from 'react';
import tw, { styled } from 'twin.macro';
import { Avatar } from '@material-tailwind/react';

export default function TodayTopUserItem({ person, img }) {
  return (
    <>
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
      <div
        className="w-[60%] mx-auto"
        style={{
          height: '2px',
          background:
            'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0, 214, 201,1) 70%, rgba(0, 214, 201,1) 70%, rgba(0,0,0,0) 100%)',
        }}
      />
    </>
  );
}

const TodayNewsContainer = styled.div`
  ${tw`py-1 px-6 flex`}
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
