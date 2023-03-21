import { React, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import dummy from './Items/data';
import HoldingListItem from './Items/HoldingListItem';

export default function HoldingList() {
  const [data] = useState(dummy);
  return (
    <HoldingListContanier>
      <HoldingListName>
        보유종목
        <AiOutlineQuestionCircle />
      </HoldingListName>
      {data.map((holding, i) => {
        return <HoldingListItem holding={holding} i={i} />;
      })}
    </HoldingListContanier>
  );
}

const HoldingListContanier = styled.div`
  ${tw`border row-span-4 bg-white rounded-xl`}
`;
const HoldingListName = styled.div`
  ${tw`text-xl mt-2 ml-2 flex justify-center`}
`;
