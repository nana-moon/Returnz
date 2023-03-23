import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';
import Chatting from '../components/chatting/Chatting';
import ThemeSetting from '../components/waiting/ThemeSetting';
import UserSetting from '../components/waiting/UserSetting';
import WaitingListItem from '../components/waiting/WaitingListItem';

export default function WaitingPage() {
  const [isHost, setIsHost] = useState(true);
  const [userList, setUserList] = useState([
    { id: 1, profile: 'green.jpg', nickname: 'chat혜성', profit: '28.7' },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ]);
  const [theme, setTheme] = useState(false);
  const [userSetting, setUserSetting] = useState(false);
  const [isUserSetting, setIsUserSetting] = useState(false);

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
  return (
    <WaitingContainer>
      <WaitingListSection>
        {userList.map((user) => {
          return <WaitingListItem key={user.id} user={user} />;
        })}
      </WaitingListSection>
      <SettingSection>
        {!isUserSetting && <ThemeSetting getIsUser={getIsUserSetting} getTheme={getTheme} />}
        {isUserSetting && <UserSetting getIsUser={getIsUserSetting} getUserSetting={getUserSetting} />}
        <ChatSection>
          <Chatting />
          <BtnBox>
            {isHost && (
              <Button to="/game" onClick={handleStart} className="bg-primary hover:bg-dprimary">
                시작하기
              </Button>
            )}
            <Button to="/" className="bg-[#E19999] hover:bg-[#976161]">
              나가기
            </Button>
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
  ${tw`border rounded-xl w-[50%] min-h-[50px] flex justify-center items-center text-white text-xl font-bold transition-colors`}
`;
