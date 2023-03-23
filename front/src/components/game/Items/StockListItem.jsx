import React from 'react';
import { useDispatch } from 'react-redux';
import tw, { styled } from 'twin.macro';
import imgpath from './bear.jpg';
import { receiveBuyData } from '../../../store/BuySellModal/BuySell.reducer';

export default function StockListItem({ Stock, i }) {
  const dispatch = useDispatch();
  return (
    <ItemContainer
      onClick={() => {
        const value = { companyName: Stock.name, orderPrice: Stock.price };
        dispatch(receiveBuyData(value));
      }}
    >
      <ItemTitleSection>
        <ItemTitleImgBox>
          <img src={imgpath} alt="dd" />
        </ItemTitleImgBox>
        <CompanyName>{Stock.name}</CompanyName>
        <ItemPriceSection>{Stock.price}</ItemPriceSection>
      </ItemTitleSection>
      <ItemInfoSection>
        <IndustryBox>{Stock.Industry}</IndustryBox>
        <UpDownBox>{Stock.e}</UpDownBox>
        <UpDownBox>{Stock.f}</UpDownBox>
      </ItemInfoSection>
    </ItemContainer>
  );
}
const ItemContainer = styled.button`
  ${tw`border w-[95%] ml-2 mt-2 flex relative drop-shadow-lg bg-white rounded-xl focus:drop-shadow-none`}
`;

const ItemTitleSection = styled.div`
  width: 10%;
  ${tw`flex absolute ml-2 mt-2 items-center w-full`}
`;

const ItemTitleImgBox = styled.div`
  ${tw`border-2 h-10 w-10 mr-2 rounded-full overflow-hidden`}
`;

const CompanyName = styled.div`
  width: 40%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${tw`font-bold text-left`}
`;

const ItemPriceSection = styled.p`
  width: 25%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${tw`text-left ml-1`}
`;

const ItemInfoSection = styled.div`
  ${tw`mt-14 ml-2 mb-2 flex w-full`}
`;

const IndustryBox = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 35%;
  ${tw`text-left ml-4`}
`;

const UpDownBox = styled.div`
  ${tw`mr-6`}
`;
