import React, { useEffect } from 'react';
import { Popover, PopoverHandler, PopoverContent, Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import imgpath from '../assets/userInfoHelp.png';
import { getIsReadyList, getPlayerList } from '../../../store/roominfo/GameRoom.selector';
import NullListItem from '../../waiting/NullListItem';
import UserLogListItem from './UserLogListItem';

export default function UserLogList({ getIsReady }) {
  const playerList = useSelector(getPlayerList);
  const isReadyList = useSelector(getIsReadyList);
  return (
    <UserLogContainer>
      <div className="absolute right-4 top-4">
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
          <PopoverContent className="z-20 w-[60%] border-gray-400 shadow-gray-600">
            <img src={imgpath} alt="" />
          </PopoverContent>
        </Popover>
      </div>
      {Array.from({ length: 4 }).map((_, i) => {
        console.log('test', playerList, isReadyList);
        if (playerList.length && isReadyList.length && i < playerList.length) {
          return (
            <UserLogListItem
              key={playerList[i]}
              player={playerList[i]}
              isReady={isReadyList[i]}
              getIsReady={getIsReady}
            />
          );
        }
        // eslint-disable-next-line react/no-array-index-key
        return <NullListItem key={i} />;
      })}
    </UserLogContainer>
  );
}

const UserLogContainer = styled.div`
  ${tw`flex flex-col justify-between h-[50%] relative`}
`;
