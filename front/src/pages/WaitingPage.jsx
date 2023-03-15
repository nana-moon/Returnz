import React from 'react';
import tw, { styled } from 'twin.macro';
// import { useQuery } from 'react-query';
import Chatting from '../components/chatting/Chatting';
import GameSetting from '../components/waiting/GameSetting';
import UserWaiting from '../components/waiting/UserWaiting';

export default function WaitingPage() {
  // 내(방장)가 들어올 때
  // 내(초대)가 들어올 때
  // 초대된 사람 들어올 때
  //
  // 게임 설정하기
  //
  // 준비하기
  // 나가기
  return (
    <WaitingContainer>
      <UserSection>
        <UserWaiting />
        <UserWaiting />
        <UserWaiting />
        <UserWaiting />
      </UserSection>
      <SettingSection>
        <GameSetting />
        <ChatBox>
          <Chatting />
          <BtnBox>
            <Button type="submit">준비하기</Button>
            <Button type="submit">나가기</Button>
          </BtnBox>
        </ChatBox>
      </SettingSection>
    </WaitingContainer>
  );
}

const WaitingContainer = styled.div`
  ${tw`w-[75%]`}
`;
const UserSection = styled.section`
  ${tw`flex gap-5 mt-24`}
`;
const SettingSection = styled.section`
  ${tw`flex gap-5 mt-5 min-h-[250px]`}
`;
const ChatBox = styled.section`
  ${tw`w-[50%] `}
`;
const BtnBox = styled.div`
  ${tw`flex gap-5 mt-5`}
`;
const Button = styled.button`
  ${tw`w-[50%] min-h-[50px] border-2 border-black`}
`;
