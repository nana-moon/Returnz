import { React, useState } from 'react';
import tw, { styled } from 'twin.macro';

export default function IncomingFriendRequests({ friendRequests }) {
  return (
    <ReceivedFriendRequestContainer>
      <RequestBox>{friendRequests}</RequestBox>
      <ButtonsBox>O X</ButtonsBox>
    </ReceivedFriendRequestContainer>
  );
}

const ReceivedFriendRequestContainer = styled.div`
  ${tw`bg-red-200`}
`;

const RequestBox = styled.div`
  ${tw`bg-red-200`}
`;

const ButtonsBox = styled.div`
  ${tw`flex bg-yellow-200`}
`;
