import React from 'react';
import tw, { styled } from 'twin.macro';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@material-tailwind/react';

import { buyNeedData, sellNeedData, modalState } from '../../../store/BuySellModal/BuySell.selector';
import { receiveSetting } from '../../../store/BuySellModal/BuySell.reducer';

export default function BuySellModal() {
  const dispatch = useDispatch();
  const modalStat = useSelector(modalState);

  const handleCloseModal = () => {
    const value = { isOpen: false, isType: '' };
    dispatch(receiveSetting(value));
  };
  return (
    <ModalContainer>
      <ModalSection>
        <ModalTitle mode={modalStat.isType}> {modalStat.isType ? '매수' : '매도'} </ModalTitle>

        <StockSection>
          <NameBox>종목이름</NameBox>
          <StockNameBox> 삼성전자 </StockNameBox>
        </StockSection>

        <StockSection>
          <CountBox>주문수량</CountBox>
          <StockCountFirstBox> 주문가능 </StockCountFirstBox>
          <StockCountSecondBox> N </StockCountSecondBox>
          <StockCountThirdBox> 주 </StockCountThirdBox>
        </StockSection>

        <CountInputContainer>
          <CountInputBox>
            <CountInput variant="static" defaultValue="0" />
          </CountInputBox>
          <ButtonContainer>
            <UpButton>▲</UpButton>
            <DownButton>▼</DownButton>
          </ButtonContainer>
        </CountInputContainer>

        <ButtonBox>
          <RatioButton> 0% </RatioButton>
          <RatioButton> 25% </RatioButton>
          <RatioButton> 50% </RatioButton>
          <RatioButton> 100% </RatioButton>
        </ButtonBox>

        <StockSection>
          <CountBox>주문단가</CountBox>
          <StockCountSecond> 0 </StockCountSecond>
          <StockCountThirdBox> 원 </StockCountThirdBox>
        </StockSection>

        <StockSection>
          <CountBox>총주문금액</CountBox>
          <StockCountSecond> 0 </StockCountSecond>
          <StockCountThirdBox> 원 </StockCountThirdBox>
        </StockSection>

        <StockSection>
          <CountBox>보유 예수금</CountBox>
          <StockCountSecond> 0 </StockCountSecond>
          <StockCountThirdBox> 원 </StockCountThirdBox>
        </StockSection>

        <SelectButtonSection>
          <CloseButton onClick={() => handleCloseModal()}> 취소 </CloseButton>
          <CorrectButton> 매매 </CorrectButton>
        </SelectButtonSection>
      </ModalSection>
    </ModalContainer>
  );
}

// const tmp = styled.div`
//   ${tw``}
// `;
const ModalSection = styled.div`
  left: 37.5%;
  top: 30%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-height: 350px;
  min-width: 250px;
  ${tw`fixed z-40 w-[25%] h-[40%] border justify-center bg-white rounded-2xl`}
`;

const ModalTitle = styled.div`
  ${tw`w-full text-center`}
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
  ${tw`w-[10%]`}
`;
const StockCountThirdBox = styled.div`
  ${tw`w-[5%]`}
`;

const ModalContainer = styled.div`
  ${tw`fixed inset-0 w-[100%] z-20`}
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
  opacity: 0.7;
  ${tw`w-[35%] h-8 px-0 py-0 bg-negative text-${true ? 'gain' : 'lose'} shadow-none hover:shadow-none`}
`;

const CorrectButton = styled(Button)`
  ${tw`w-[35%] h-8 px-0 py-0 bg-${true ? 'gain' : 'lose'} text-white`}
`;
