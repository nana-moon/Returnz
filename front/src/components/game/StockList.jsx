import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
// import StockData from './Items/StockListData';
import { Popover, PopoverHandler, PopoverContent, Button } from '@material-tailwind/react';
import imgpath from './assets/stockListHelp.png';
import StockListItem from './Items/StockListItem';
import { change, receiveSetting } from '../../store/buysellmodal/BuySell.reducer';
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
  const [result, setResult] = useState(0);

  const isThis = noWorkidx.includes(selectidx);

  console.log('stocklist', Object.keys(stockDatas)[selectidx]);

  // const [stockData, setStockData] = useState(StockData);
  const handleOpenModal = (data) => {
    const value = { isOpen: true, isType: data };
    dispatch(receiveSetting(value));
    dispatch(change(result));
  };

  const checkCanSell = (data) => {
    console.log(canSell, canSell.holdingcount);
    const foundObj = canSell.holdingcount.find((obj) => Object.keys(obj)[0] === data);
    console.log('부모컴포넌트', data, canSell, '개수:', foundObj[data]);
    setResult(foundObj[data]);
  };

  return (
    <StockListContanier>
      {modalStat.isOpen ? <BuySellModal code={Object.keys(stockDatas)[selectidx]} checkCanSell={checkCanSell} /> : null}
      <StockListSection>
        상장 종목
        <div className="absolute top-1 right-4">
          <Popover
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            placement="right-start"
          >
            <PopoverHandler>
              <Button variant="gradient" color="white" size="sm" className="border border-negative">
                ?
              </Button>
            </PopoverHandler>
            <PopoverContent className="z-20 border-gray-400 shadow-xl shadow-gray-600">
              <img src={imgpath} alt="" />
            </PopoverContent>
          </Popover>
        </div>
      </StockListSection>
      <ListContanier>
        <div className="mt-16 mb-4">
          {Object.values(stockDatas).map((Stock, i) => {
            // eslint-disable-next-line react/no-array-index-key
            return <StockListItem Stock={Stock} i={i} Code={stockDatas} key={i} checkCanSell={checkCanSell} />;
          })}
        </div>
      </ListContanier>
      <OrderButton>
        <BuyButton type="button" onClick={() => handleOpenModal(true)} disabled={canBuy.companyName === '' || isThis}>
          매수
        </BuyButton>
        <SellButton type="button" onClick={() => handleOpenModal(false)} disabled={result <= 0 || isThis}>
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
  ${tw`text-2xl fixed absolute z-10 bg-white w-full text-center rounded-t-xl pt-2 border-t border-l border-r`}
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
