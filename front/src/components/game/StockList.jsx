import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import StockData from './Items/StockListData';
import StockListItem from './Items/StockListItem';
import { receiveSetting } from '../../store/BuySellModal/BuySell.reducer';
import { modalState, sellNeedData } from '../../store/BuySellModal/BuySell.selector';
import BuySellModal from './modals/BuySellModal';

export default function StockList() {
  const dispatch = useDispatch();
  const modalStat = useSelector(modalState);
  const canSell = useSelector(sellNeedData);

  const [stockData, setStockData] = useState(StockData);
  const handleOpenModal = (data) => {
    const value = { isOpen: true, isType: data };
    dispatch(receiveSetting(value));
  };
  return (
    <StockListContanier>
      {modalStat.isOpen ? <BuySellModal /> : null}
      <StockListSection>상장종목</StockListSection>
      <ListContanier>
        <div className="mt-16 mb-4">
          {stockData.map(function (Stock, i) {
            return <StockListItem Stock={Stock} key={Stock.name} />;
          })}
        </div>
      </ListContanier>
      <OrderButton>
        <BuyButton type="button" onClick={() => handleOpenModal(true)}>
          매수
        </BuyButton>
        <SellButton type="button" onClick={() => handleOpenModal(false)} disabled={canSell.holdingcount === 0}>
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
