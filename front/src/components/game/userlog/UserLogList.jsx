import React from 'react';
import tw, { styled } from 'twin.macro';
import UserLogListItem from './UserLogListItem';

export default function UserLogList() {
  const temp = [
    { nickname: 'jiae', profile: '/A.jpg', total: 100000, profit: 15 },
    { nickname: 'jun', profile: '/B.jpg', total: 100000, profit: 15 },
    { nickname: 'jun', profile: '/C.jpg', total: 100000, profit: 15 },
    { nickname: 'jun', profile: '/D.jpg', total: 100000, profit: 15 },
  ];
  return (
    <UserLogContainer>
      {temp.map((item) => {
        return <UserLogListItem key={temp.nickname} temp={item} />;
      })}
    </UserLogContainer>
  );
}

const UserLogContainer = styled.div`
  ${tw`flex flex-col justify-between h-[50%]`}
`;
