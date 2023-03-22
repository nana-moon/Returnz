import React from 'react';
import tw, { styled } from 'twin.macro';

export default function StockInfo() {
  return <StockInfoContanier>주가 정보</StockInfoContanier>;
}

const StockInfoContanier = styled.div`
  margin-top: 1.25rem;
  ${tw`border row-span-3 bg-white rounded-xl h-[23%]`}
`;
