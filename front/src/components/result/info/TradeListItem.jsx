import React from 'react';
import tw, { styled } from 'twin.macro';
import { Tooltip } from '@material-tailwind/react';

export default function TradeListItem({ trade }) {
  const { category, companyCode, companyName, count, curTurn, date, price, totalTurn } = trade;
  return (
    <TradeItemContainer>
      <Tooltip content="매매유형">
        <p className={category ? 'text-lose' : 'text-gain'}>{category ? '매도' : '매수'}</p>
      </Tooltip>
      <Tooltip content="거래종목">{companyName}</Tooltip>
      <Tooltip content="거래일자">{date.split('T')[0]}</Tooltip>
      <Tooltip content="거래단가">{`${price.toLocaleString()}`}</Tooltip>
      <Tooltip content="거래수량">{`${count.toLocaleString()}`}</Tooltip>
      <Tooltip content="거래금액">{`${(price * count).toLocaleString()}`}</Tooltip>
    </TradeItemContainer>
  );
}

const TradeItemContainer = styled.div`
  ${tw`border rounded-xl flex justify-evenly my-1 py-2`}
`;
