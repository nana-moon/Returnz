import { React, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { AiOutlineStock } from 'react-icons/ai';
import newsDummy from './todayNewsDummy';
import TodayNewsItem from './Items/TodayNewsItem';

export default function TodayNews() {
  const [data] = useState(newsDummy);
  return (
    <TodayNewsContainer>
      <TodayNewsTitle>
        오늘의 추천 종목
        <AiOutlineStock className="my-auto" />
      </TodayNewsTitle>
      <TodayNewsSection>
        {data.map((news, i) => {
          // eslint-disable-next-line react/no-array-index-key
          return <TodayNewsItem news={news} key={i} />;
        })}
      </TodayNewsSection>
    </TodayNewsContainer>
  );
}

const TodayNewsContainer = styled.div`
  ${tw`text-center`}
`;
const TodayNewsTitle = styled.div`
  ${tw`flex text-2xl gap-2 justify-center`}
`;

const TodayNewsSection = styled.div`
  ${tw`h-full p-2 grid grid-cols-2 grid-rows-2 gap-2`}
`;
