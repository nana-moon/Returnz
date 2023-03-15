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
      <div className="col-span-3">
        <TopButtons />
      </div>
      <div className="col-span-3 bg-blue-200">
        <TodayPrice />
      </div>
      <div className="row-span-2 bg-red-200">
        <TodayTopUser />
      </div>
      <div className="col-span-2 bg-red-100">
        <TodayNews />
      </div>
      <div className="col-span-2 bg-red-100">
        <TodayWord />
      </div>
    </MainDiv>
  );
}

const MainDiv = styled.div`
  ${tw`grid grid-cols-3 grid-rows-4 gap-6 bg-base py-6`}
`;
