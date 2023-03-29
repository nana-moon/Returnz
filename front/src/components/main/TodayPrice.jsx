import { React, useState, useMemo } from 'react';
import tw, { styled } from 'twin.macro';
import { useQuery } from 'react-query';
import {
  getExchangeKrUs,
  getExchangeKrJp,
  getExchangeKrEu,
  getExchangeKrBit,
  // getOilPrice,
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
    onError: (e) => {
      console.log(e);
    },
    staleTime: 1000000,
  });
  // const { data: oilPrice } = useQuery({
  //   queryKey: ['getOilPrice'],
  //   queryFn: () => getOilPrice(),
  //   onError: (e) => {
  //     console.log(e);
  //   },
  //   staleTime: 1000000,
  // });

  return (
    <TodayPriceContainer>
      <TodayPriceItem>
        <StockTitle>
          {exchangeKrUs?.['1. From_Currency Code']}-{exchangeKrUs?.['3. To_Currency Code']}
        </StockTitle>
        <StockPrice>{exchangeKrUs?.['5. Exchange Rate']}</StockPrice>
      </TodayPriceItem>
      <TodayPriceItem>
        <StockTitle>
          {exchangeKrJp?.['1. From_Currency Code']}-{exchangeKrJp?.['3. To_Currency Code']}
        </StockTitle>
        <StockPrice>{exchangeKrJp?.['5. Exchange Rate']}</StockPrice>
      </TodayPriceItem>
      <TodayPriceItem>
        <StockTitle>
          {exchangeKrEu?.['1. From_Currency Code']}-{exchangeKrEu?.['3. To_Currency Code']}
        </StockTitle>
        <StockPrice>{exchangeKrEu?.['5. Exchange Rate']}</StockPrice>
      </TodayPriceItem>
      <TodayPriceItem>
        <StockTitle>
          {exchangeKrBit?.['1. From_Currency Code']}-{exchangeKrBit?.['3. To_Currency Code']}
        </StockTitle>
        <StockPrice>{exchangeKrBit?.['5. Exchange Rate']}</StockPrice>
      </TodayPriceItem>
      <TodayPriceItem>
        <StockTitle> 원유 가격</StockTitle>
        {/* <StockPrice>{oilPrice[0].date}</StockPrice>
        <StockPrice>{oilPrice[0].value}</StockPrice> */}
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
