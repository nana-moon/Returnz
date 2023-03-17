import React from 'react';
import tw, { styled } from 'twin.macro';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { Tooltip, Button } from '@material-tailwind/react';

export default function HoldingList() {
  return (
    <HoldingListContanier>
      <HoldingListName>보유종목</HoldingListName>
      <Tooltip
        content="Material Tailwind"
        placement="right-end"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <ContentTooltip />
      </Tooltip>
      {/* <AiOutlineQuestionCircle /> */}
      {/* <HoldingListItem /> */}
    </HoldingListContanier>
  );
}

const HoldingListContanier = styled.div`
  ${tw`border row-span-4 bg-white rounded-xl`}
`;
const HoldingListName = styled.div`
  ${tw`text-xl mt-2 ml-2`}
`;

const ContentTooltip = styled(AiOutlineQuestionCircle)`
  ${tw`w-20`}
`;
