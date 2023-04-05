import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import { getIsReadyList, getPlayerList } from '../../../store/roominfo/GameRoom.selector';
import NullListItem from '../../waiting/NullListItem';
import UserLogListItem from './UserLogListItem';

export default function UserLogList({ getIsReady }) {
  const playerList = useSelector(getPlayerList);
  const isReadyList = useSelector(getIsReadyList);
  return (
    <UserLogContainer>
      {Array.from({ length: 4 }).map((_, i) => {
        console.log('test', playerList, isReadyList);
        if (playerList.length && isReadyList.length && i < playerList.length) {
          // console.log('12341234', isReadyList[0], 'player :', playerList, i);
          // console.log('userloglist', isReadyList[i]);
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
  ${tw`flex flex-col justify-between h-[50%]`}
`;
