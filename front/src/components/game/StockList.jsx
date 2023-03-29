import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
// import StockData from './Items/StockListData';
import StockListItem from './Items/StockListItem';
import { receiveSetting } from '../../store/buysellmodal/BuySell.reducer';
import { modalState, sellNeedData, buyNeedData, selectedIdx } from '../../store/buysellmodal/BuySell.selector';
import { stockDataList, noWorkDay } from '../../store/gamedata/GameData.selector';
import BuySellModal from './modals/BuySellModal';

export default function StockList() {
  const dispatch = useDispatch();
  const modalStat = useSelector(modalState);
  const canBuy = useSelector(buyNeedData);
  const canSell = useSelector(sellNeedData);
  const stockDatas = useSelector(stockDataList);
  const selectidx = useSelector(selectedIdx);
  const noWorkidx = useSelector(noWorkDay);

  const isThis = noWorkidx.includes(selectidx);

  // const [stockData, setStockData] = useState(StockData);
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
          {Object.values(stockDatas).map((Stock, i) => {
            return <StockListItem Stock={Stock} i={i} key={Stock.adjclose} />;
          })}
        </div>
      </ListContanier>
      <OrderButton>
        <BuyButton type="button" onClick={() => handleOpenModal(true)} disabled={canBuy.companyName === '' || isThis}>
          매수
        </BuyButton>
        <SellButton
          type="button"
          onClick={() => handleOpenModal(false)}
          disabled={canSell.companyName === '' || isThis}
        >
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
  ${tw`text-white bg-gain font-bold rounded-lg w-[25%] py-2 align-middle text-center shadow-lg`}
  ${({ disabled }) => (disabled ? tw`bg-negative` : tw`bg-gain`)}
`;
const SellButton = styled.button`
  ${tw`text-white bg-lose font-bold rounded-lg w-[25%] py-2 text-center`}
  ${({ disabled }) => (disabled ? tw`bg-negative` : tw`bg-lose`)}
`;
