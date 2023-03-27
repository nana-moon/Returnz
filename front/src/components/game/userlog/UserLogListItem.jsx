import React from 'react';
import tw, { styled } from 'twin.macro';

export default function UserLogListItem() {
  // isHost 들어갈 정보 달라짐
  const temp = {};
  return <UserLogItemContainer>UserLogListItem</UserLogItemContainer>;
}

const UserLogItemContainer = styled.div`
  ${tw`border-2 bg-white rounded-xl flex flex-col gap-2 justify-between h-[100%]`}
`;
