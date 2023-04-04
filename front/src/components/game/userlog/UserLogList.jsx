import React from 'react';
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
        if (i < playerList.length) {
          return (
            <UserLogListItem
              key={playerList[i].nickname}
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
