import React from 'react';
import tw, { styled } from 'twin.macro';
import UserLogListItem from './UserLogListItem';

export default function UserLogList() {
  return (
    <UserLogContainer>
      <UserLogListItem />
      <UserLogListItem />
      <UserLogListItem />
      <UserLogListItem />
    </UserLogContainer>
  );
}

const UserLogContainer = styled.div`
  ${tw`flex flex-col gap-2 justify-between`}
`;
