import React from 'react';
import tw, { styled } from 'twin.macro';

export default function StockInfo() {
  return <StockInfoContanier>주가 정보</StockInfoContanier>;
}

const StockInfoContanier = styled.div`
  ${tw`border row-span-3 bg-white rounded-xl`}
`;
