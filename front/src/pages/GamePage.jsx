import React from 'react';
import tw, { styled } from 'twin.macro';
import Rate from '../components/game/Rate';
import Stocks from '../components/game/StockList';
import HoldingList from '../components/game/HoldingList';
import Turn from '../components/game/Turn';
import Graph from '../components/game/Graph';
import StockInfo from '../components/game/StockInfo';
import Header from '../components/common/Header';

export default function GamePage() {
  return (
    <>
      <Header />
      <GameContainer>
        <LeftSection>
          <Rate />
          <Stocks />
          <HoldingList />
        </LeftSection>
        <MiddleSection>
          <Turn />
          <Graph />
          <StockInfo />
        </MiddleSection>
        <RightSection>친구와 채팅</RightSection>
      </GameContainer>
    </>
  );
}

const GameContainer = styled.div`
  ${tw`grid grid-cols-12 gap-5 w-[100%] p-5 font-spoq`}
`;
const LeftSection = styled.div`
  ${tw`col-span-3 grid gap-5`};
`;
const MiddleSection = styled.div`
  ${tw`col-span-6 grid gap-5`}
`;
const RightSection = styled.div`
  ${tw`col-span-3 border-2 bg-white rounded-xl`}
`;
