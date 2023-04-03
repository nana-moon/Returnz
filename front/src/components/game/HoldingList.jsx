import React from 'react';
import tw, { styled } from 'twin.macro';
import { useSelector } from 'react-redux';
import { Popover, PopoverHandler, PopoverContent, Button } from '@material-tailwind/react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import imgpath from './assets/holdingListHelp.png';
import { gamerStockList } from '../../store/gamedata/GameData.selector';
import HoldingListItem from './Items/HoldingListItem';

export default function HoldingList() {
  const data = useSelector(gamerStockList);
  const keys = Object.keys(data);
  const holdingdata = [];

  for (const key of keys) {
    if (data[key].totalCount > 0) {
      holdingdata.push(data[key]);
    }
  }
  return (
    <HoldingListContanier>
      <HoldingListName>
        보유 종목
        <div className="absolute right-4">
          <Popover
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            placement="top-end"
          >
            <PopoverHandler>
              <Button variant="gradient" color="white" size="sm" className="border border-negative">
                ?
              </Button>
            </PopoverHandler>
            <PopoverContent className="z-10 shadow-xl border-gray-400 shadow-xl shadow-gray-600">
              <img src={imgpath} alt="" />
            </PopoverContent>
          </Popover>
        </div>
      </HoldingListName>
      <ListContanier>
        {holdingdata.map((holding, i) => {
          return <HoldingListItem holding={holding} i={i} key={holding.id} />;
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
    display: none;
  }
  ${tw` bg-white rounded-xl overflow-y-auto relative pt-12 pb-4`}
`;
const HoldingListName = styled.div`
  ${tw`text-2xl flex justify-center items-center fixed border bg-white w-full absolute z-10 rounded-t-xl h-[15%]`}
`;
