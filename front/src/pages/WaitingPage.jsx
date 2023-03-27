/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { Link, useNavigate } from 'react-router-dom';
import Chatting from '../components/chatting/Chatting';
import ThemeSetting from '../components/waiting/ThemeSetting';
import UserSetting from '../components/waiting/UserSetting';
import WaitingListItem from '../components/waiting/WaitingListItem';
import { startGameApi, gameDataApi } from '../apis/gameApi';

export default function WaitingPage() {
  const navigate = useNavigate();
  // 방장
  const [isHost, setIsHost] = useState(true);

  // 대기자 리스트
  const [userList, setUserList] = useState([
    { id: 1, profile: 'green.jpg', nickname: 'chat혜성', profit: '28.7' },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ]);

  // 게임 설정 state
  const initial = {
    theme: null,
    turnPerTime: 'NO',
    startTime: null,
    totalTurn: null,
    memberIdList: [],
  };
  const [setting, setSetting] = useState(initial);
  const [isUserSetting, setIsUserSetting] = useState(false); // 사용자 설정 확인
  const [isValidSetting, setIsValidSetting] = useState(false); // 설정 유효성 검사

  // 게임 설정 action
  const isValid = () => {
    if (setting.theme === null) {
      return false;
    }
    if (setting.theme === 'usersetting') {
      if (setting.turnPerTime === 'NO' || setting.startTime === null || setting.totalTurn === null) {
        return false;
      }
      return true;
    }
    return true;
  };
  const getIsUserSetting = () => {
    setIsUserSetting(!isUserSetting);
  };
  const getTheme = (data) => {
    const newData = { ...setting, theme: data };
    setSetting(newData);
  };
  const getUserSetting = (newData) => {
    console.log('setting update!!!');
    setSetting(newData);
  };

  //
  useEffect(() => {
    const flag = isValid();
    setIsValidSetting(flag);
    console.log(flag, '--------');
    console.log(setting);
  }, [setting]);

  useEffect(() => {
    console.log(isValidSetting);
  }, [isValidSetting]);

  // 게임 시작
  const handleStart = async (e) => {
    if (isValidSetting) {
      const gameId = await startGameApi(setting);
      await gameDataApi(gameId);
      navigate('/game');
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
        {!isUserSetting && <ThemeSetting getIsUserSetting={getIsUserSetting} getTheme={getTheme} />}
        {isUserSetting && (
          <UserSetting setting={setting} getIsUserSetting={getIsUserSetting} getUserSetting={getUserSetting} />
        )}
        <ChatSection>
          <Chatting />
          <BtnBox>
            {isHost && (
              <StartButton onClick={handleStart} disabled={!isValidSetting}>
                시작하기
              </StartButton>
            )}
            <BackButton to="/" className="bg-[#E19999] hover:bg-[#976161]">
              나가기
            </BackButton>
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
const StartButton = styled.button`
  ${tw`border rounded-xl w-[50%] min-h-[50px] flex justify-center items-center text-white text-xl font-bold transition-colors`}
  ${({ disabled }) => (disabled ? tw`bg-primary hover:bg-none` : tw`bg-primary hover:bg-dprimary`)}
`;
const BackButton = styled(Link)`
  ${tw`border rounded-xl w-[50%] min-h-[50px] flex justify-center items-center text-white text-xl font-bold transition-colors`}
`;
