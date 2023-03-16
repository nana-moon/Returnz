import React from 'react';
import tw, { styled } from 'twin.macro';

export default function HoldingList() {
  return (
    <HoldingListContanier>
      <HoldingListName>보유종목</HoldingListName>
      {/* <HoldingListItem/> */}
    </HoldingListContanier>
  );
}

const HoldingListContanier = styled.div`
  ${tw`border row-span-3 bg-white rounded-xl`}
`;
const HoldingListName = styled.div`
  ${tw`text-xl mt-2 ml-2`}
`;
