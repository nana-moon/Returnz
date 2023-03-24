import React from 'react';
import tw, { styled } from 'twin.macro';
import TradeListItem from './TradeListItem';

export default function TradeList() {
  const trades = [
    { id: 1, type: '매수', corp: '삼성전자', date: '2020-12-12', amount: 160000, count: 2, unit: 80000 },
    { id: 2, type: '매도', corp: '삼성전자', date: '2020-12-12', amount: 160000, count: 2, unit: 80000 },
    { id: 3, type: '매수', corp: '삼성전자', date: '2020-12-12', amount: 160000, count: 2, unit: 80000 },
    { id: 4, type: '매수', corp: '삼성전자', date: '2020-12-12', amount: 160000, count: 2, unit: 80000 },
    { id: 5, type: '매수', corp: '삼성전자', date: '2020-12-12', amount: 160000, count: 2, unit: 80000 },
    { id: 6, type: '매수', corp: '삼성전자', date: '2020-12-12', amount: 160000, count: 2, unit: 80000 },
    { id: 7, type: '매수', corp: '삼성전자', date: '2020-12-12', amount: 160000, count: 2, unit: 80000 },
    { id: 8, type: '매수', corp: '삼성전자', date: '2020-12-12', amount: 160000, count: 2, unit: 80000 },
    { id: 9, type: '매수', corp: '삼성전자', date: '2020-12-12', amount: 160000, count: 2, unit: 80000 },
    { id: 10, type: '매수', corp: '삼성전자', date: '2020-12-12', amount: 160000, count: 2, unit: 80000 },
  ];
  return (
    <TradeListContainer>
      {trades.map((trade) => {
        return <TradeListItem key={trade.id} trade={trade} />;
      })}
    </TradeListContainer>
  );
}

const TradeListContainer = styled.div`
  ${tw` bg-white h-[200px] overflow-y-auto`}
`;
