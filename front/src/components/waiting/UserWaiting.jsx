import React from 'react';
import tw, { styled } from 'twin.macro';

export default function UserWaiting() {
  return <UserContainer>user</UserContainer>;
}

const UserContainer = styled.div`
  ${tw`border-2 border-black w-[100%] min-h-[200px]`}
`;
