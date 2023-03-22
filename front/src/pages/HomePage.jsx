import React from 'react';
import tw, { styled } from 'twin.macro';
import TodayNews from '../components/main/TodayNews';
import TodayPrice from '../components/main/TodayPrice';
import TodayTopUser from '../components/main/TodayTopUser';
import TopButtons from '../components/main/TopButtons';
import TodayWord from '../components/main/TodayWord';

export default function HomePage() {
  return (
    <MainContainer>
      <FlexedSection>
        <TopButtons />
      </FlexedSection>
      <FlexedSection>
        <TodayPrice />
      </FlexedSection>
      <TopUsersSection>
        <TodayTopUser />
      </TopUsersSection>
      <InfoSection>
        <TodayNews />
      </InfoSection>
      <InfoSection>
        <TodayWord />
      </InfoSection>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  ${tw`grid grid-cols-3 grid-rows-6 py-6 w-[75%] font-spoq`}
`;

const FlexedSection = styled.div`
  ${tw`col-span-3`}
`;

const TopUsersSection = styled.div`
  ${tw`row-span-4`}
`;

const InfoSection = styled.div`
  ${tw`row-span-2 col-span-2 bg-red-200`}
`;
