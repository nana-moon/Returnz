import { React, useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
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
      <TodayNewsTitle>📈 오늘의 추천 종목 </TodayNewsTitle>
      <div
        className="w-[60%] mx-auto absolute"
        style={{
          height: '2px',
          top: '144px',
          left: '100px',
          background:
            'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0, 214, 201,1) 70%, rgba(0, 214, 201,1) 70%, rgba(0,0,0,0) 100%)',
        }}
      />
      <div
        className="w-[1%] h-[70%] mx-auto absolute"
        style={{
          top: '36px',
          left: '50%',
          width: '2px',
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0, 214, 201,1) 70%, rgba(0, 214, 201,1) 70%, rgba(0,0,0,0) 100%)',
        }}
      />

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
  ${tw`relative text-center mt-3 bg-white rounded-xl border-2 border-negative p-2`}
`;
const TodayNewsTitle = styled.div`
  transform: translateY(-46px);
  left: 5%;
  ${tw`text-3xl text-center font-bold border w-[90%] absolute bg-white rounded-2xl border-negative border-2 py-1`}
`;

const TodayNewsSection = styled.div`
  ${tw`h-full grid grid-cols-2 grid-rows-2 gap-2 mt-1`}
`;
