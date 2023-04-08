import { React } from 'react';
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
    enabled: false,
    cacheTime: 6000000,
    refetchInterval: 6000000,
    staleTime: Infinity,
    refetchOnMount: false,
  });
  const { data: exchangeKrJp } = useQuery({
    queryKey: ['exchangeKrJp'],
    queryFn: () => getExchangeKrJp(),
    onError: (e) => {
      console.log(e);
    },
    enabled: false,
    cacheTime: 60000000,
    refetchInterval: 6000000,
    staleTime: Infinity,
    refetchOnMount: false,
  });
  const { data: exchangeKrEu } = useQuery({
    queryKey: ['exchangeKrEu'],
    queryFn: () => getExchangeKrEu(),
    onError: (e) => {
      console.log(e);
    },
    enabled: false,
    cacheTime: 60000000,
    refetchInterval: 6000000,
    staleTime: Infinity,
    refetchOnMount: false,
  });

  const { data: exchangeKrBit } = useQuery({
    queryKey: ['getExchangeKrBit'],
    queryFn: () => getExchangeKrBit(),
    onSuccess: (res) => {
      console.log(res['5. Exchange Rate'], 'gg');
      return res;
    },
    onError: (e) => {
      console.log(e);
    },
    enabled: false,
    cacheTime: 60000000,
    refetchInterval: 6000000,
    staleTime: Infinity,
    refetchOnMount: false,
  });
  const { data: oilPrice } = useQuery({
    queryKey: ['getOilPrice'],
    queryFn: () => getOilPrice(),
    onError: (e) => {
      console.log(e);
    },
    enabled: false,
    cacheTime: 60000000,
    refetchInterval: 6000000,
    staleTime: Infinity,
    refetchOnMount: false,
  });
  return (
    <TodayPriceContainer>
      <TodayPriceItem>
        <StockTitle>미국 달러 환율</StockTitle>
        {/* <StockPrice>
          {parseFloat(exchangeKrUs?.['5. Exchange Rate'])
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          원
        </StockPrice> */}
        <StockPrice>1318.56 원</StockPrice>
      </TodayPriceItem>
      <TodayPriceItem>
        <StockTitle>일본 엔 환율</StockTitle>
        {/* <StockPrice>
          {(parseFloat(exchangeKrJp?.['5. Exchange Rate']) * 100)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          원
        </StockPrice> */}
        <StockPrice>1,002.60원</StockPrice>
      </TodayPriceItem>
      <TodayPriceItem>
        <StockTitle>유럽 유로 환율</StockTitle>
        {/* <StockPrice>
          {parseFloat(exchangeKrEu?.['5. Exchange Rate'])
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          원
        </StockPrice> */}
        <StockPrice>1,434.80</StockPrice>
      </TodayPriceItem>
      <TodayPriceItem>
        <StockTitle>비트코인 현재가</StockTitle>
        {/* <StockPrice>
          {parseFloat(exchangeKrBit?.['5. Exchange Rate'])
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          원
        </StockPrice> */}
        <StockPrice>36,844,147.8</StockPrice>
      </TodayPriceItem>
      <TodayPriceItem>
        <StockTitle> 원유 가격</StockTitle>
        {/* <StockPrice>${oilPrice?.value.toLocaleString()}</StockPrice> */}
        <StockPrice>$80.4</StockPrice>
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
  ${tw`text-black font-bold`}
`;

const StockPrice = styled.div`
  ${tw`text-sm`}
`;
