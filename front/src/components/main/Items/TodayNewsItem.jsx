import React from 'react';
import { Avatar } from '@material-tailwind/react';
import tw, { styled } from 'twin.macro';

export default function TodayNewsItem({ stock }) {
  return (
    <TodayNewsContainer>
      <Avatar size="xl" variant="circular" src={stock.logo} className=" border-2 border-negative" />
      <TitleText>{stock.stockName}</TitleText>
      <ContentText>{stock.stockCode}</ContentText>
    </TodayNewsContainer>
  );
}

const TodayNewsContainer = styled.div`
  ${tw`bg-white border-2 border-negative rounded-lg py-1 px-2`}
`;

const TitleText = styled.div`
  ${tw`text-lg font-bold`}
`;

const ContentText = styled.div`
  ${tw`text-sm`}
`;
