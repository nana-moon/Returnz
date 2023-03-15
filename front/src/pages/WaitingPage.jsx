import React from 'react';
import tw, { styled } from 'twin.macro';
import Chatting from '../components/chatting/Chatting';
import GameSetting from '../components/waiting/GameSetting';
import UserWaiting from '../components/waiting/UserWaiting';

export default function WaitingPage() {
  return (
    <WaitingContainer>
      <UserWaiting />
      <UserWaiting />
      <UserWaiting />
      <UserWaiting />
      <GameSetting />
      <Chatting />
      <button type="submit">준비하기</button>
      <button type="submit">나가기</button>
    </WaitingContainer>
  );
}

const WaitingContainer = styled.div`
  ${tw`flex`}
`;
