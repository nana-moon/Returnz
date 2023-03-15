import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function TodayPrice() {
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
