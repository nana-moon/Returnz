import React from 'react';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import { getPlayerList } from '../../../store/roominfo/GameRoom.selector';
import NullListItem from '../../waiting/NullListItem';
import UserLogListItem from './UserLogListItem';

export default function UserLogList() {
  const playerList = useSelector(getPlayerList);
  return (
    <UserLogContainer>
      {Array.from({ length: 4 }).map((_, i) => {
        if (i < playerList.length) {
          return <UserLogListItem key={playerList[i].nickname} player={playerList[i]} />;
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
