import React from 'react';
import { Avatar } from '@material-tailwind/react';
import tw, { styled } from 'twin.macro';

export default function TodayNewsItem({ stock }) {
  return (
    <TodayNewsContainer bgImg={stock.logo}>
      <Avatar size="xl" variant="circular" src={stock.logo} className=" border-2 border-negative" />
      <TitleText>{stock.stockName}</TitleText>
      <ContentText>{stock.stockCode}</ContentText>
    </TodayNewsContainer>
  );
}
// background-image: url(${(props) => props.bgImg});
// background-color: rgba(255, 255, 255, 0.2);
// background-size: 100px 100px;
// opacity: 1;
const TodayNewsContainer = styled.div`
  // background-image: url(${(props) => props.bgImg});
  ${tw`bg-white hover:bg-negative rounded-lg py-1 px-2`}
`;

const TitleText = styled.div`
  ${tw`text-lg font-bold`}
`;

const ContentText = styled.div`
  ${tw`text-sm`}
`;
