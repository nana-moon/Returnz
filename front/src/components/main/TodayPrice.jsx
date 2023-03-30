import { React, useState, useMemo } from 'react';
import tw, { styled } from 'twin.macro';
import { useQuery } from 'react-query';
import {
  getExchangeKrUs,
  getExchangeKrJp,
  getExchangeKrEu,
  getExchangeKrBit,
  getOilPrice,
} from '../../apis/todayRateApi';

export default function TodayPrice() {
  const { data: exchangeKrUs } = useQuery({
    queryKey: ['exchangeKrUs'],
    queryFn: () => getExchangeKrUs(),
    onError: (e) => {
      console.log(e);
    },
    staleTime: 1000000,
  });
  const { data: exchangeKrJp } = useQuery({
    queryKey: ['exchangeKrJp'],
    queryFn: () => getExchangeKrJp(),
    onError: (e) => {
      console.log(e);
    },
    staleTime: 1000000,
  });
  const { data: exchangeKrEu } = useQuery({
    queryKey: ['exchangeKrEu'],
    queryFn: () => getExchangeKrEu(),
    onError: (e) => {
      console.log(e);
    },
    staleTime: 1000000,
  });

  const { data: exchangeKrBit } = useQuery({
    queryKey: ['getExchangeKrBit'],
    queryFn: () => getExchangeKrBit(),
    onSuccess: (res) => {
      // res['5. Exchange Rate'] = res['5. Exchange Rate'] * 100;
      console.log(res['5. Exchange Rate'], 'gg');
      return res;
    },
    onError: (e) => {
      console.log(e);
    },
    staleTime: 1000000,
  });
  const { data: oilPrice } = useQuery({
    queryKey: ['getOilPrice'],
    queryFn: () => getOilPrice(),
    onError: (e) => {
      console.log(e);
    },
    staleTime: 1000000,
  });

  return (
    <TodayPriceContainer>
      <TodayPriceItem>
        <StockTitle>미국 달러 환율</StockTitle>
        <StockPrice>{exchangeKrUs?.['5. Exchange Rate']}</StockPrice>
      </TodayPriceItem>
      {/* <TodayPriceItem>
        <StockTitle>
          {exchangeKrUs?.['1. From_Currency Code']}-{exchangeKrUs?.['3. To_Currency Code']}
        </StockTitle>
        <StockPrice>{exchangeKrUs?.['5. Exchange Rate']}</StockPrice>
      </TodayPriceItem> */}
      <TodayPriceItem>
        <StockTitle>일본 엔 환율</StockTitle>
        <StockPrice>{exchangeKrJp?.['5. Exchange Rate']}</StockPrice>
      </TodayPriceItem>
      <TodayPriceItem>
        <StockTitle>유럽 유로 환율</StockTitle>
        <StockPrice>{exchangeKrEu?.['5. Exchange Rate']}</StockPrice>
      </TodayPriceItem>
      <TodayPriceItem>
        <StockTitle>비트코인 현재가</StockTitle>
        <StockPrice>{exchangeKrBit?.['5. Exchange Rate']}</StockPrice>
      </TodayPriceItem>
      <TodayPriceItem>
        <StockTitle> {oilPrice?.date} 원유 가격</StockTitle>
        <StockPrice>{oilPrice?.value}</StockPrice>
      </TodayPriceItem>
    </TodayPriceContainer>
  );
}

const TodayPriceContainer = styled.div`
  ${tw`flex justify-between`}
`;

const TodayPriceItem = styled.div`
  ${tw`bg-white w-1/6 border border-negative rounded-lg border-2 px-4 py-1 text-center`}
`;

const StockTitle = styled.div`
  ${tw`text-black`}
`;

const StockPrice = styled.div`
  ${tw`text-sm`}
`;
