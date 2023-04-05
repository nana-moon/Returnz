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
      <TickerWrapper>
        <TickerText>
          TIP. 우선주는 일반적으로 보통주보다 재산적 내용(이익, 이자배당, 잔여재산 분배 등)에 있어서 우선적 지위가
          인정되는 주식입니다. 그 대가로 우선주 소유자는 주주총회에서의 의결권을 포기해야 합니다.
        </TickerText>
      </TickerWrapper>
      <PriceSection>
        <TodayPrice />
      </PriceSection>
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
  ${tw`mt-12`}
`;

const ButtonsSection = styled.div`
  ${tw`my-10`}
`;
const RecommendedSection = styled.div`
  ${tw`col-span-3`}
`;

const TopUsersSection = styled.div`
  ${tw`row-span-3 col-span-2`}
`;

const InfoSection = styled.div`
  ${tw`col-span-3 row-span-2`}
`;
const TickerWrapper = styled.div`
  position: absolute;
  left: 0px;
  overflow: hidden;
`;

const TickerText = styled.p`
  display: inline-block;
  white-space: nowrap;
  animation: ticker 20s linear infinite;
  @keyframes ticker {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;
