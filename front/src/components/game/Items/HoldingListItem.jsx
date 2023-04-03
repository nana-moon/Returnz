/* eslint-disable no-nested-ternary */
import React from 'react';
import tw, { styled } from 'twin.macro';
import imgpath from './bear.jpg';

export default function HoldingListItem({ holding }) {
  let profit;
  if (holding.profitRate < 0) {
    profit = 'lose';
  }
  if (holding.profitRate === 0) {
    profit = 'negative';
  }
  if (holding.profitRate > 0) {
    profit = 'gain';
  }
  return (
    <ItemContainer state={profit}>
      <ItemTitleSection>
        <ItemTitleImgBox>
          <img src={holding.logo} alt="dd" />
        </ItemTitleImgBox>
        <CompanyName>{holding.companyName}</CompanyName>
      </ItemTitleSection>
      <ContentContainer>
        <LeftScetion>
          <p>평가손익</p>
          <p>손익률 </p>
          <p>평가금</p>
        </LeftScetion>
        <LeftBox state={profit}>
          <p>{holding.valuation} 원</p>
          <p>
            {/* {holding.profitRate < 1
              ? holding.profitRate === 0
                ? '0.00 %'
                : `${((1 - holding.profitRate) * 100).toFixed(2)} %`
              : `${Math.abs((1 - holding.profitRate) * 100).toFixed(2)} %`} */}
            {holding.profitRate} %
          </p>
          <p>{holding.totalAmount.toLocaleString()} 원</p>
        </LeftBox>
        <RightSection>
          <p>매도가능</p>
          <p>평균단가</p>
          <p>매입금 </p>
        </RightSection>
        <RightBox>
          <p>{holding.totalCount.toLocaleString()} 주</p>
          <p>{holding.averagePrice.toLocaleString()} 원</p>
          {/* <p>{(holding.totalCount * holding.averagePrice).toLocaleString()} 원</p> */}
          <p>{holding.totalAmount.toLocaleString()} 원</p>
        </RightBox>
      </ContentContainer>
    </ItemContainer>
  );
}
const ItemContainer = styled.div`
  ${(props) => (props.state === 'gain' ? tw`bg-red-100` : null)}
  ${(props) => (props.state === 'lose' ? tw`bg-blue-100` : null)} 
  ${(props) => (props.state === 'negative' ? tw`bg-negative` : null)}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${tw`rounded-xl mx-2 mb-4`}
`;

const ItemTitleSection = styled.div`
  ${tw`ml-2 mt-2 items-center w-[95%] flex items-center`}
`;

const ItemTitleImgBox = styled.div`
  ${tw`border-2 h-10 w-10 mr-2 rounded-full overflow-hidden`}
`;

const CompanyName = styled.div`
  width: 40%;

  ${tw`font-bold text-left`}
`;

const LeftScetion = styled.div`
  ${tw`flex-col w-[22.5%] ml-4 text-sm`}
`;

const LeftBox = styled.div`
  ${(props) => (props.state === 'gain' ? tw`text-gain` : null)}
  ${(props) => (props.state === 'lose' ? tw`text-lose` : null)}  
  ${tw`flex-col w-[25%]  text-right pr-2 text-sm`}
`;

const RightSection = styled.div`
  ${tw`flex-col w-[22.5%] border-l pl-2 text-sm`}
`;

const RightBox = styled.div`
  ${tw`flex-col w-[25%]  text-right pr-2 text-sm`}
`;

const ContentContainer = styled.div`
  ${tw`flex pb-2`}
`;
