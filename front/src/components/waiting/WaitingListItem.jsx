import React from 'react';
import tw, { styled } from 'twin.macro';

export default function WaitingListItem({ isReady }) {
  return (
    <UserContainer>
      <div>user info</div>
      {isReady && <div>READY!</div>}
    </UserContainer>
  );
}

const UserContainer = styled.div`
  ${tw`border-2 border-black w-[100%] min-h-[200px] bg-white`}
`;
