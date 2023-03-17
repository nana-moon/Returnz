import React from 'react';
import tw, { styled } from 'twin.macro';

export default function rate() {
  return (
    <RateContanier>
      <div> 금리 </div>
      <div> 환율 </div>
      <div> 유가 </div>
    </RateContanier>
  );
}

const RateContanier = styled.div`
  ${tw`border row-span-1 flex place-content-evenly bg-white rounded-xl`}
`;
