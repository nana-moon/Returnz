import { React, useState, useMemo } from 'react';
import tw, { styled } from 'twin.macro';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function TodayPrice() {
  const BASE_URL = 'https://www.alphavantage.co/query';
  const param = process.env.EXCHANGE_API_KEY;
  const getExchangeRateApi = (payload) => {
    const res = axios.get(
      `${BASE_URL}?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=KRW&apikey=${payload}`,
    );
    return res;
  };
  const { data: exchangerate } = useQuery({
    queryKey: ['exchangerate', param],
    queryFn: () => getExchangeRateApi(param),
    onSuccess: (data) => {
      console.log(data.data['Realtime Currency Exchange Rate'], 'please.......');
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return (
    <TodayPriceContainer>
      <TodayPriceItem>
        <StockTitle>
          {exchangerate?.data['Realtime Currency Exchange Rate']['1. From_Currency Code']}-
          {exchangerate?.data['Realtime Currency Exchange Rate']['3. To_Currency Code']}
        </StockTitle>
        <StockPrice>{exchangerate?.data['Realtime Currency Exchange Rate']['5. Exchange Rate']}</StockPrice>
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
