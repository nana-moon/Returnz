import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';
import Chatting from '../components/chatting/Chatting';
import ThemeSetting from '../components/waiting/ThemeSetting';
import UserSetting from '../components/waiting/UserSetting';

export default function WaitingPage() {
  const [theme, setTheme] = useState(false);
  const [userSetting, setUserSetting] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const getIsUser = () => {
    setIsUser(!isUser);
  };
  const getTheme = (data) => {
    setTheme(data);
  };
  const getUserSetting = (data) => {
    setUserSetting(data);
  };
  const handleStart = (e) => {
    console.log(theme, userSetting);
    if (!theme && !userSetting) {
      e.preventDefault();
    }
  };
  const handleReady = () => {};
  return (
    <WaitingContainer>
      <WaitingList />
      <SettingSection>
        {!isUser && <ThemeSetting getIsUser={getIsUser} getTheme={getTheme} />}
        {isUser && <UserSetting getIsUser={getIsUser} getUserSetting={getUserSetting} />}
        <ChatBox>
          <Chatting />
          <BtnBox>
            {isCreator && <Button onClick={handleReady}>준비하기</Button>}
            {!isCreator && (
              <Button to="/game" onClick={handleStart}>
                시작하기
              </Button>
            )}
            <Button to="/">나가기</Button>
          </BtnBox>
        </ChatBox>
      </SettingSection>
    </WaitingContainer>
  );
}

const WaitingContainer = styled.div`
  ${tw`w-[75%]`}
`;

const SettingSection = styled.section`
  ${tw`flex gap-5 mt-10 min-h-[250px]`}
`;
const ChatBox = styled.section`
  ${tw`w-[50%] `}
`;
const BtnBox = styled.div`
  ${tw`flex gap-5 mt-5`}
`;
const Button = styled(Link)`
  ${tw`w-[50%] min-h-[50px] border-2 border-black flex justify-center items-center`}
`;
