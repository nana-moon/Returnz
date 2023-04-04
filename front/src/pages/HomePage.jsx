import React from 'react';
import tw, { styled } from 'twin.macro';
import { Avatar } from '@material-tailwind/react';
import TodayNews from '../components/main/TodayNews';
import TodayPrice from '../components/main/TodayPrice';
import TodayTopUser from '../components/main/TodayTopUser';
import TopButtons from '../components/main/TopButtons';
import TodayWord from '../components/main/TodayWord';

export default function HomePage() {
  return (
    <MainContainer>
      <PriceSection>{/* <TodayPrice /> */}</PriceSection>
      <ButtonsSection>
        <TopButtons />
      </ButtonsSection>
      <div className="grid grid-cols-5 grid-rows-3 gap-8 mt-20">
        <TopUsersSection>
          <TodayTopUser />
        </TopUsersSection>
        <RecommendedSection>
          <TodayNews />
        </RecommendedSection>
        {/* <InfoSection>
          
        </InfoSection> */}
        <InfoSection>
          <TodayWord />
        </InfoSection>
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  ${tw`w-[75%] font-spoq`}
`;
const PriceSection = styled.div`
  height: 56px;
  ${tw``}
`;

const ButtonsSection = styled.div`
  ${tw`my-10`}
`;
const RecommendedSection = styled.div`
  ${tw`col-span-3`}
`;
const TestBox = styled.div`
  ${tw`bg-white border-2 border-negative rounded-lg`}
`;

const TopUsersSection = styled.div`
  ${tw`row-span-3 col-span-2`}
`;

const InfoSection = styled.div`
  ${tw`col-span-3 row-span-2`}
`;
