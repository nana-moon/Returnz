import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import StockData from './Items/StockListData';
import StockListItem from './Items/StockListItem';
import BuySellModal from './modals/BuySellModal';

export default function StockList() {
  const [stockData, setStockData] = useState(StockData);
  const [stockPrice, setStockPrice] = useState(0);
  const [openBuySellModal, setopenBuySellModal] = useState({ state: false, name: null, money: null, price: null });

  const handleSetPrice = (data) => {
    console.log(data, 'data');
    setStockPrice(data);
  };
  return (
    <StockListContanier>
      {openBuySellModal ? <BuySellModal /> : null}
      <StockListSection>상장종목</StockListSection>
      <ListContanier>
        <div className="mt-16 mb-4">
          {stockData.map(function (Stock, i) {
            return <StockListItem Stock={Stock} key={Stock.name} handleSetPrice={handleSetPrice} />;
          })}
        </div>
      </ListContanier>
      <OrderButton>
        <BuyButton type="button" onClick={() => setopenBuySellModal(true, 1)}>
          매수
        </BuyButton>
        <SellButton type="button" onClick={() => setopenBuySellModal(true, 2)}>
          매도
        </SellButton>
      </OrderButton>
    </StockListContanier>
  );
}
const StockListContanier = styled.div`
  margin-top: 1.25rem;
  ${tw` relative rounded-xl h-[55%]`}
`;
const ListContanier = styled.div`
  height: 88%;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  ${tw`border bg-white rounded-xl overflow-y-auto`}
`;
const StockListSection = styled.div`
  ${tw`text-2xl fixed absolute z-10 bg-white w-full text-center border rounded-t-xl h-[10%]`}
`;
const OrderButton = styled.div`
  ${tw`absolute bottom-0 flex w-[100%] place-content-evenly`}
`;
const BuyButton = styled.button`
  ${tw`text-white bg-gain font-bold rounded-lg w-[25%] py-2 align-middle text-center`}
`;
const SellButton = styled.button`
  ${tw`text-white bg-lose font-bold rounded-lg w-[25%] py-2 text-center`}
`;
