import React from 'react';
import tw, { styled } from 'twin.macro';

export default function BuySellModal() {
  return (
    <ModalContainer>
      <ModalSection>
        <ModalTitle>매수 / 매도 주문</ModalTitle>
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
      </ModalSection>
    </ModalContainer>
  );
}

const tmp = styled.div`
  ${tw``}
`;
const ModalSection = styled.div`
  left: 37.5%;
  top: 30%;
  ${tw`fixed z-30 w-[25%] h-[40%] border justify-center bg-white rounded-2xl`}
`;

const ModalTitle = styled.div`
  ${tw`w-full text-center`}
`;

const StockSection = styled.div`
  ${tw`flex ml-4`}
`;

const NameBox = styled.div`
  ${tw`w-[70%]`}
`;

const StockNameBox = styled.div`
  ${tw`w-[20%] text-right`}
`;

const CountBox = styled.div`
  ${tw`w-[60%]`}
`;

const StockCountFirstBox = styled.div`
  ${tw`w-[20%]`}
`;
const StockCountSecondBox = styled.div`
  ${tw`w-[5%]`}
`;
const StockCountThirdBox = styled.div`
  ${tw`w-[5%]`}
`;

const ModalContainer = styled.div`
  opacity: 1;
  ${tw`fixed inset-0 w-[100%] bg-black z-20`}
`;
