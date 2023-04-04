import { React, useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { AiOutlineStock } from 'react-icons/ai';
import { getRecommendedStock } from '../../apis/homeApi';
import TodayNewsItem from './Items/TodayNewsItem';

export default function TodayNews() {
  const [recommendedStock, setRecommendedStock] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await getRecommendedStock();
      setRecommendedStock(res);
    }
    fetchData();
  }, []);
  return (
    <TodayNewsContainer>
      <TodayNewsTitle>
        오늘의 추천 종목
        <AiOutlineStock className="my-auto" />
      </TodayNewsTitle>
      <TodayNewsSection>
        {recommendedStock?.map((stock) => {
          // eslint-disable-next-line react/no-array-index-key
          return <TodayNewsItem stock={stock} key={stock.stockCode} />;
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
