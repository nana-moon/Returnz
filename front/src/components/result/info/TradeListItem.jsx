import React from 'react';
import tw, { styled } from 'twin.macro';
import { Tooltip } from '@material-tailwind/react';

export default function TradeListItem({ trade }) {
  const { category, companyCode, companyName, count, curTurn, date, price, totalTurn } = trade;
  return (
    <TradeItemContainer>
      <Tooltip content="매매유형">
        <p className={`${category ? 'text-lose' : 'text-gain'} w-[10%] pl-2`}>{category ? '매도' : '매수'}</p>
      </Tooltip>
      <Tooltip content="거래종목">
        <p className="w-[20%]">{companyName}</p>
      </Tooltip>
      <Tooltip content="거래일자">
        <p className="w-[15%] mr-2">{date.split('T')[0]} </p>
      </Tooltip>
      <Tooltip content="거래단가">
        <p className="w-[20%] text-center">{`${price.toLocaleString()}원`} </p>
      </Tooltip>
      <Tooltip content="거래수량">
        <p className="w-[10%] text-center mx-6"> {`${count.toLocaleString()}`} </p>
      </Tooltip>
      <Tooltip content="거래금액">
        <p className=" w-[20%] text-right pr-2">{`${(price * count).toLocaleString()}원`} </p>
      </Tooltip>
    </TradeItemContainer>
  );
}

const TradeItemContainer = styled.div`
  ${tw`border rounded-xl flex flex-nowrap items-center w-[100%] my-1 py-2`}
`;
