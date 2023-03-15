import React from 'react';
import tw, { styled } from 'twin.macro';
import TodayNews from '../components/main/TodayNews';
import TodayPrice from '../components/main/TodayPrice';
import TodayTopUser from '../components/main/TodayTopUser';
import TopButtons from '../components/main/TopButtons';
import TodayWord from '../components/main/TodayWord';

export default function HomePage() {
  return (
    <MainDiv>
      <FlexedContainer>
        <TopButtons />
      </FlexedContainer>
      <FlexedContainer>
        <TodayPrice />
      </FlexedContainer>
      <div className="row-span-4 bg-red-200">
        <TodayTopUser />
      </div>
      <div className="row-span-2 col-span-2 bg-red-100">
        <TodayNews />
      </div>
      <div className="row-span-2 col-span-2 bg-yellow-100">
        <TodayWord />
      </div>
    </MainDiv>
  );
}

const MainDiv = styled.div`
  ${tw`grid grid-cols-3 grid-rows-6 bg-base py-6 w-[75%] font-spoq`}
`;

const FlexedContainer = styled.div`
  ${tw`col-span-3`}
`;
