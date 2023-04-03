import React from 'react';
import tw, { styled } from 'twin.macro';
import { useSelector } from 'react-redux';
import { changeInterest } from '../../store/gamedata/GameData.selector';

export default function Rate() {
  const rateData = useSelector(changeInterest);
  console.log(rateData);
  return (
    <RateContanier>
      <div>
        <div> 환율 </div>
        <div> 한국 금리 </div>
        <div> 미국 금리 </div>
      </div>
      <div>
        <div> {rateData.exchangeRate}</div>
        <div> {rateData.korea}</div>
        <div> {rateData.usa}</div>
      </div>
    </RateContanier>
  );
}

const RateContanier = styled.div`
  ${tw`border h-[8%] flex place-content-evenly bg-white rounded-xl`}
`;
