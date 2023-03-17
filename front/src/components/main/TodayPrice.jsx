import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import axios from 'axios';

export default function TodayPrice() {
  const BASE_URL = 'https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService';
  return (
    <TodayPriceContainer>
      <TodayPriceItem>
        <StockTitle>KOSPI</StockTitle>
        <StockPrice>243,291</StockPrice>
        <StockPrice>▼ -0.8%</StockPrice>
      </TodayPriceItem>
      <TodayPriceItem>
        <StockTitle>NASDAQ</StockTitle>
        <StockPrice>322,243,291</StockPrice>
        <StockPrice>▼ -0.8111111%</StockPrice>
      </TodayPriceItem>
      <TodayPriceItem
        onClick={() => {
          axios
            .get(BASE_URL, {
              params: {
                serviceKey: process.env.STOCK_API_KEY,
              },
            })
            .then((결과) => {
              console.log(결과.data);
            })
            .catch(() => {
              console.log('실패함');
            });
        }}
      >
        버튼
      </TodayPriceItem>
    </TodayPriceContainer>
  );
}

const TodayPriceContainer = styled.div`
  ${tw`flex justify-between`}
`;

const TodayPriceItem = styled.div`
  ${tw`bg-white border border-negative rounded-lg border-2 px-4 py-1 text-center`}
`;

const StockTitle = styled.div`
  ${tw`text-black text-lg`}
`;

const StockPrice = styled.div`
  ${tw`text-lose text-sm`}
`;
