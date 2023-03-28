import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import { receiveBuyData, receiveSellData, selectIdx } from '../../../store/buysellmodal/BuySell.reducer';
import { selectedIdx } from '../../../store/buysellmodal/BuySell.selector';
import { stockDataList } from '../../../store/gamedata/GameData.selector';

export default function StockListItem({ Stock, i }) {
  const dispatch = useDispatch();
  const isSelect = useSelector(selectedIdx);

  const handleselectIdx = (data) => {
    dispatch(selectIdx(data));
  };

  const createRipple = (e) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - (rect.left + scrollLeft) - radius}px`;
    circle.style.top = `${e.clientY - (rect.top + scrollTop) - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <ItemContainer
      i={i}
      j={isSelect}
      onClick={(e) => {
        createRipple(e);
        handleselectIdx(i);
        const value = { companyName: Stock[Stock.length - 1].companyName, orderPrice: Stock[Stock.length - 1].close };
        dispatch(receiveBuyData(value));
        // 보유수량 확인 가능하면 수정해야됨
        dispatch(receiveSellData(value));
      }}
    >
      <span className="ripple" />
      <ItemTitleSection>
        <ItemTitleImgBox>
          <img src={Stock[Stock.length - 1].logo} alt="dd" />
        </ItemTitleImgBox>
        <CompanyName>{Stock[Stock.length - 1].companyName}</CompanyName>
        <ItemPriceSection>{Stock[Stock.length - 1].close}</ItemPriceSection>
      </ItemTitleSection>
      <ItemInfoSection>
        <IndustryBox>산업군</IndustryBox>
        <UpDownBox>1000</UpDownBox>
        <UpDownBox>0.3</UpDownBox>
      </ItemInfoSection>
    </ItemContainer>
  );
}

const ItemContainer = styled.button`
  position: relative; // Add this line
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    transform: scale(0);
    animation: ripple-effect 1s linear forwards;
  }

  @keyframes ripple-effect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  ${(props) => (props.i === props.j ? tw`ring-2 ring-negative drop-shadow-none` : tw``)}
  ${tw`border w-[95%] ml-2 mt-2 flex relative drop-shadow-lg bg-white rounded-xl overflow-hidden`}
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
