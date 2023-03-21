import React from 'react';
import tw, { styled } from 'twin.macro';
import { Tooltip } from '@material-tailwind/react';

export default function TradeListItem({ trade }) {
  const { type, corp, date, unit, count, amount } = trade;
  return (
    <TradeItemContainer>
      <Tooltip content="매매유형">{type}</Tooltip>
      <Tooltip content="거래종목">{corp}</Tooltip>
      <Tooltip content="거래일자">{date}</Tooltip>
      <Tooltip content="거래단가">{`${unit}`}</Tooltip>
      <Tooltip content="거래수량">{`${count}`}</Tooltip>
      <Tooltip content="거래금액">{`${amount}`}</Tooltip>
    </TradeItemContainer>
  );
}

const TradeItemContainer = styled.div`
  ${tw`border rounded-xl flex justify-evenly my-1 py-2`}
`;
