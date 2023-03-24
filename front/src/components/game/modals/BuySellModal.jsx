/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@material-tailwind/react';
import { createGlobalStyle } from 'styled-components';

import { buyNeedData, sellNeedData, modalState } from '../../../store/BuySellModal/BuySell.selector';
import { receiveSetting } from '../../../store/BuySellModal/BuySell.reducer';

export default function BuySellModal() {
  const dispatch = useDispatch();

  const [orderCount, setOrderCount] = useState(0);
  const [lastValidOrderCount, setLastValidOrderCount] = useState(orderCount);

  const modalStat = useSelector(modalState);
  const buyData = useSelector(buyNeedData);
  const sellData = useSelector(sellNeedData);
  const modalData = modalStat.isType ? buyData : sellData;
  const maxOrderCount = modalStat.isType
    ? Math.floor(modalData.holdingCash / modalData.orderPrice)
    : modalData.holdingcount;

  useEffect(() => {
    if (orderCount > maxOrderCount || orderCount < 0) {
      setOrderCount(lastValidOrderCount);
    } else {
      setLastValidOrderCount(orderCount);
    }
  }, [orderCount, lastValidOrderCount, maxOrderCount]);

  const handleCloseModal = () => {
    setTimeout(() => {
      const value = { isOpen: false, isType: '' };
      dispatch(receiveSetting(value));
    }, 500);
  };

  const handleUpCount = () => {
    if (orderCount < maxOrderCount) {
      setOrderCount(orderCount + 1);
    }
  };

  const handleDownCount = () => {
    if (orderCount > 0) {
      setOrderCount(orderCount - 1);
    }
  };

  const handleChangeCount = (percent) => {
    if (percent === 0) {
      setOrderCount(0);
    } else if (percent === 25) {
      setOrderCount(parseInt(maxOrderCount / 4));
    } else if (percent === 50) {
      setOrderCount(parseInt(maxOrderCount / 2));
    } else {
      setOrderCount(maxOrderCount);
    }
  };

  return (
    <>
      <GlobalStyle />
      <ModalContainer> </ModalContainer>
      <ModalSection modalStat={modalStat}>
        <ModalTitle mode={modalStat.isType ? 'gain' : 'lose'}> {modalStat.isType ? '매수' : '매도'} 주문 </ModalTitle>

        <StockSection>
          <NameBox>종목이름</NameBox>
          <StockNameBox> {modalData.companyName} </StockNameBox>
        </StockSection>

        <StockSection>
          <CountBox>주문수량</CountBox>
          <StockCountFirstBox> 주문가능 </StockCountFirstBox>
          <StockCountSecondBox>
            {modalStat.isType ? Math.floor(modalData.holdingCash / modalData.orderPrice) : modalData.holdingcount}
          </StockCountSecondBox>
          <StockCountThirdBox> 주 </StockCountThirdBox>
        </StockSection>

        <CountInputContainer>
          <CountInputBox>
            <CountInput
              variant="static"
              value={orderCount}
              onChange={(e) => {
                const newOrderCount = parseInt(e.target.value);
                if (!isNaN(newOrderCount)) {
                  setOrderCount(newOrderCount);
                } else {
                  setOrderCount(0);
                }
              }}
            />
          </CountInputBox>
          <ButtonContainer>
            <UpButton onClick={() => handleUpCount()}>▲</UpButton>
            <DownButton onClick={() => handleDownCount()}>▼</DownButton>
          </ButtonContainer>
        </CountInputContainer>

        <ButtonBox>
          <RatioButton onClick={() => handleChangeCount(0)}> 0% </RatioButton>
          <RatioButton onClick={() => handleChangeCount(25)}> 25% </RatioButton>
          <RatioButton onClick={() => handleChangeCount(50)}> 50% </RatioButton>
          <RatioButton onClick={() => handleChangeCount(100)}> 100% </RatioButton>
        </ButtonBox>

        <StockSection>
          <CountBox>주문단가</CountBox>
          <StockCountSecond> {modalData.orderPrice.toLocaleString()} </StockCountSecond>
          <StockCountThirdBox> 원 </StockCountThirdBox>
        </StockSection>

        <StockSection>
          <CountBox>총주문금액</CountBox>
          <StockCountSecond> {(modalData.orderPrice * orderCount).toLocaleString()} </StockCountSecond>
          <StockCountThirdBox> 원 </StockCountThirdBox>
        </StockSection>

        {modalStat.isType ? (
          <StockSection>
            <CountBox>보유 예수금</CountBox>
            <StockCountSecond> {modalData.holdingCash.toLocaleString()} </StockCountSecond>
            <StockCountThirdBox> 원 </StockCountThirdBox>
          </StockSection>
        ) : null}

        <SelectButtonSection>
          <CloseButton onClick={() => handleCloseModal()} mode={modalStat.isType ? 'gain' : 'lose'}>
            취소
          </CloseButton>
          <CorrectButton mode={modalStat.isType ? 'gain' : 'lose'} disabled={orderCount === 0}>
            {modalStat.isType ? '매수' : '매도'}
          </CorrectButton>
        </SelectButtonSection>
      </ModalSection>
    </>
  );
}

// const tmp = styled.div`
//   ${tw``}
// `;
const GlobalStyle = createGlobalStyle`
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-50px);
    }
  }
  }
`;

const ModalContainer = styled.div`
  opacity: 0.6;
  ${tw`fixed inset-0 w-[100%] bg-black z-20`}
`;
const ModalSection = styled.div`
  left: 37.5%;
  top: 30%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-height: 350px;
  min-width: 250px;
  ${tw`fixed z-40 w-[25%] h-[40%] border justify-center bg-white rounded-2xl`}
  animation: ${({ modalStat }) => (modalStat.isOpen ? 'fadeIn' : 'fadeOut')} 0.5s linear forwards;
`;

const ModalTitle = styled.div`
  ${tw`w-full text-center text-3xl my-4`}
  ${({ mode }) => (mode === 'gain' ? tw`text-gain` : tw`text-lose`)}
`;

const StockSection = styled.div`
  ${tw`flex ml-4 mt-1`}
`;

const NameBox = styled.div`
  ${tw`w-[47%] text-negative`}
`;

const StockNameBox = styled.div`
  ${tw`w-[50%] text-right pr-2`}
`;

const CountBox = styled.div`
  ${tw`w-[40%] text-negative`}
`;

const StockCountFirstBox = styled.div`
  ${tw`w-[40%] text-right pr-2`}
`;
const StockCountSecondBox = styled.div`
  ${tw`w-[10%] text-right pr-2`}
`;
const StockCountThirdBox = styled.div`
  ${tw`w-[5%]`}
`;

const ButtonContainer = styled.div`
  ${tw`flex flex-col`}
`;

const CountInputContainer = styled.div`
  ${tw`w-[100%] flex justify-center my-2`}
`;
const CountInputBox = styled.div`
  overflow: hidden;
  ${tw`w-[82%] mr-2`}
`;

const CountInput = styled(Input)`
  ${tw`text-right overflow-hidden`}
`;

const UpButton = styled.button`
  ${tw`h-6`}
`;

const DownButton = styled.button`
  ${tw`h-6`}
`;

const ButtonBox = styled.div`
  ${tw`w-[100%] flex place-content-evenly`}
`;

const RatioButton = styled(Button)`
  opacity: 0.7;
  ${tw`h-6 w-[18%] mx-1 px-0 py-0 bg-negative shadow-none hover:shadow-none`}
`;

const StockCountSecond = styled.div`
  ${tw`w-[50%] text-right pr-2`}
`;

const SelectButtonSection = styled.div`
  ${tw`w-[100%] flex place-content-evenly mt-4`}
`;

const CloseButton = styled(Button)`
  opacity: 0.5;
  ${tw`w-[35%] h-8 px-0 py-0 bg-negative shadow-none hover:shadow-none`}
  ${({ mode }) => (mode === 'gain' ? tw`text-gain` : tw`text-lose`)}
`;

const CorrectButton = styled(Button)`
  ${tw`w-[35%] h-8 px-0 py-0 text-white`}
  ${({ mode }) => (mode === 'gain' ? tw`bg-gain` : tw`bg-lose`)}
`;
