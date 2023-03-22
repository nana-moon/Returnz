import React from 'react';
import tw, { styled } from 'twin.macro';

export default function WaitingListItem() {
  return (
    <UserContainer>
      <div>user info</div>
    </UserContainer>
  );
}

const UserContainer = styled.div`
  ${tw`border bg-white rounded-xl w-[100%] min-h-[200px]`}
`;
