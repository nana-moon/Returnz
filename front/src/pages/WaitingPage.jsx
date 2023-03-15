import React from 'react';
import tw, { styled } from 'twin.macro';
import Chatting from '../components/chatting/Chatting';
import GameSetting from '../components/waiting/GameSetting';
import UserWaiting from '../components/waiting/UserWaiting';

export default function WaitingPage() {
  // 게임 유저 데이터 Get 함수

  // 게임 세팅 데이터 Post 함수

  // test data

  return (
    <WaitingContainer>
      <UserSection>
        <UserWaiting />
        <UserWaiting />
        <UserWaiting />
        <UserWaiting />
      </UserSection>
      <SetSection>
        <GameSetting />
        <ChatBox>
          <Chatting />
          <BtnBox>
            <Button type="submit">준비하기</Button>
            <Button type="submit">나가기</Button>
          </BtnBox>
        </ChatBox>
      </SetSection>
    </WaitingContainer>
  );
}

const WaitingContainer = styled.div`
  ${tw``}
`;
const UserSection = styled.section`
  ${tw`flex`}
`;
const SetSection = styled.section`
  ${tw`flex`}
`;
const ChatBox = styled.section`
  ${tw`w-[50%]`}
`;
const BtnBox = styled.div`
  ${tw`flex`}
`;
const Button = styled.button`
  ${tw`border-2 border-black w-[100%]`}
`;
