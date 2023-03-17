import React from 'react';
import tw, { styled } from 'twin.macro';
import StockListItem from './Items/StockListItem';

export default function StockList() {
  return (
    <StockListContanier>
      <StockListSection>상장종목</StockListSection>
      <StockListItem />
      <OrderButton>
        <BuyButton type="button"> 매수 </BuyButton>
        <SellButton type="button"> 매도 </SellButton>
      </OrderButton>
    </StockListContanier>
  );
}

const StockListContanier = styled.div`
  ${tw`border row-span-5 relative bg-white rounded-xl`}
`;
const StockListSection = styled.div`
  ${tw`text-xl ml-2 mt-2`}
`;
const OrderButton = styled.div`
  ${tw`absolute bottom-0 flex w-[100%] place-content-evenly`}
`;
const BuyButton = styled.button`
  ${tw`text-white bg-gain hover:bg-dprimary font-bold rounded-lg px-8 py-2 align-middle text-center`}
`;
const SellButton = styled.button`
  ${tw`text-white bg-lose hover:bg-dprimary font-bold rounded-lg px-8 py-2 text-center`}
`;
