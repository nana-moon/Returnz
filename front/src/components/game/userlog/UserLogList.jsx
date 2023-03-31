import React from 'react';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import { getPlayerList } from '../../../store/roominfo/GameRoom.selector';
import NullListItem from '../../waiting/NullListItem';
import UserLogListItem from './UserLogListItem';

export default function UserLogList() {
  const playerList = useSelector(getPlayerList);
  console.log(playerList);
  const temp = [
    { nickname: 'j', profile: '/A.jpg', total: 100000, profit: 15 },
    { nickname: 'i', profile: '/B.jpg', total: 100000, profit: 15 },
    { nickname: 'e', profile: '/C.jpg', total: 100000, profit: 15 },
    { nickname: 'a', profile: '/D.jpg', total: 100000, profit: 15 },
  ];
  return (
    <UserLogContainer>
      {Array.from({ length: 4 }).map((_, i) => {
        if (i < 4) {
          console.log(i, playerList[i]);
          return <UserLogListItem key={temp[i].nickname} temp={temp[i]} />;
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
