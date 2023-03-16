import React from 'react';
import tw, { styled } from 'twin.macro';
import imgpath from './bear.jpg';

export default function StockListItem() {
  return (
    <ItemContainer>
      <ItemTitleSection>
        <ItemTitleImgBox>
          <img src={imgpath} alt="dd" />
        </ItemTitleImgBox>
        <p>삼성전자</p>
      </ItemTitleSection>
      <ItemPriceSection>
        <p>115,000</p>
      </ItemPriceSection>
      <ItemInfoSection>
        <p className="ml-4">전자</p>
        <p className="ml-16">500▲</p>
        <p className="ml-4">0.1▲</p>
      </ItemInfoSection>
    </ItemContainer>
  );
}

const ItemContainer = styled.button`
  ${tw`border w-[90%] ml-2 mt-2 flex relative drop-shadow-lg bg-white rounded-xl focus:drop-shadow-none`}
`;

const ItemTitleSection = styled.div`
  ${tw`flex absolute ml-2 mt-2`}
`;

const ItemTitleImgBox = styled.div`
  ${tw`border h-6 w-6 mr-2`}
`;

const ItemPriceSection = styled.div`
  ${tw`absolute right-16 mt-2`}
`;

const ItemInfoSection = styled.div`
  ${tw`mt-10 mb-2 flex relative`}
`;
