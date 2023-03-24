import { React, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import dummy from './Items/HoldingListData';
import HoldingListItem from './Items/HoldingListItem';

export default function HoldingList() {
  const [data] = useState(dummy);
  return (
    <HoldingListContanier>
      <HoldingListName>
        보유종목
        <AiOutlineQuestionCircle className="ml-2" />
      </HoldingListName>
      <ListContanier>
        {data.map((holding, i) => {
          return <HoldingListItem holding={holding} i={i} key={holding.name} />;
        })}
      </ListContanier>
    </HoldingListContanier>
  );
}

const HoldingListContanier = styled.div`
  margin-top: 1.25rem;
  ${tw`border row-span-4 bg-white rounded-xl h-[33%] relative`}
`;
const ListContanier = styled.div`
  height: 100%;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  ${tw` bg-white rounded-xl overflow-y-auto relative pt-12 pb-4`}
`;
const HoldingListName = styled.div`
  ${tw`text-2xl flex justify-center items-center fixed border bg-white w-full absolute z-10 rounded-t-xl h-[15%]`}
`;
