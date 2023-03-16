import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';
import Chatting from '../components/chatting/Chatting';
import ThemeSetting from '../components/waiting/ThemeSetting';
import UserSetting from '../components/waiting/UserSetting';
import WaitingListItem from '../components/waiting/WaitingListItem';

export default function WaitingPage() {
  const [isHost, setIsHost] = useState(false);
  const [theme, setTheme] = useState(false);
  const [userSetting, setUserSetting] = useState(false);
  const [isUserSetting, setIsUserSetting] = useState(false);
  const [isReady, setIsReady] = useState(true);
  // 테마 설정 관련
  const getIsUserSetting = () => {
    setIsUserSetting(!isUserSetting);
  };
  const getTheme = (data) => {
    setTheme(data);
  };
  const getUserSetting = (data) => {
    setUserSetting(data);
  };

  // 게임 준비 및 시작 관련
  const handleStart = (e) => {
    if (!theme && !userSetting) {
      e.preventDefault();
    }
  };
  const handleReady = () => {};
  return (
    <WaitingContainer>
      <WaitingListSection>
        <WaitingListItem isReady={isReady} />
        <WaitingListItem />
        <WaitingListItem />
        <WaitingListItem />
      </WaitingListSection>
      <SettingSection>
        {!isUserSetting && <ThemeSetting getIsUser={getIsUserSetting} getTheme={getTheme} />}
        {isUserSetting && <UserSetting getIsUser={getIsUserSetting} getUserSetting={getUserSetting} />}
        <ChatSection>
          <Chatting />
          <BtnBox>
            {!isHost && <Button onClick={handleReady}>준비하기</Button>}
            {isHost && (
              <Button to="/game" onClick={handleStart}>
                시작하기
              </Button>
            )}
            <Button to="/">나가기</Button>
          </BtnBox>
        </ChatSection>
      </SettingSection>
    </WaitingContainer>
  );
}

const WaitingContainer = styled.div`
  ${tw`w-[75%]`}
`;
const WaitingListSection = styled.section`
  ${tw`flex gap-5 mt-10 min-h-[250px]`}
`;
const SettingSection = styled.section`
  ${tw`flex gap-5 mt-10 min-h-[250px]`}
`;
const ChatSection = styled.section`
  ${tw`w-[50%] `}
`;
const BtnBox = styled.div`
  ${tw`flex gap-5 mt-5`}
`;
const Button = styled(Link)`
  ${tw`w-[50%] min-h-[50px] border-2 border-black flex justify-center items-center`}
`;
