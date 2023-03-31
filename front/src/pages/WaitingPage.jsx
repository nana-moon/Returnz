/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import tw, { styled } from 'twin.macro';
import Cookies from 'js-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SockJs from 'sockjs-client';
import Stomp from 'webstomp-client';
import StompJs from 'stompjs';
import { startGameApi, gameDataApi } from '../apis/gameApi';
import { getWaiterList } from '../store/roominfo/WaitRoom.selector';
import Chatting from '../components/chatting/Chatting';
import ThemeSetting from '../components/waiting/ThemeSetting';
import UserSetting from '../components/waiting/UserSetting';
import WaitingListItem from '../components/waiting/WaitingListItem';
import { removeWaiterList, setWaiterList } from '../store/roominfo/WaitRoom.reducer';
import NullListItem from '../components/waiting/NullListItem';
import { setGamerId, setGameRoomId, setPlayerList, setRoomInfo } from '../store/roominfo/GameRoom.reducer';
import {
  handleGetGameData,
  handleGetStockDescription,
  handleGetStockInfomation,
} from '../store/gamedata/GameData.reducer';

export default function WaitingPage() {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // -------------------------대기방 데이터-----------------------------

  // 대기방 state - 확인완료
  const roomInfo = location.state;

  // 방장 state
  const myEmail = Cookies.get('email');
  const myProfile = Cookies.get('profileIcon');
  const myNickname = Cookies.get('nickname');
  const isHost = myEmail === roomInfo.captainName;
  const newWaiter = { id: 1, username: myEmail, nickname: myNickname, profile: myProfile, avgProfit: null };
  const [initialDispatch, setInitialDispatch] = useState(false);
  useEffect(() => {
    if (!initialDispatch) {
      dispatch(setWaiterList(newWaiter));
      setInitialDispatch(true);
    }
  }, [dispatch, initialDispatch]);

  // 대기자 state
  const waiterList = useSelector(getWaiterList);

  // -------------------------SOCKET state-----------------------------

  // socket 연결 시 사용할 데이터 - 확인완료
  const ACCESS_TOKEN = Cookies.get('access_token');
  const waitRoomId = roomInfo.roomId;
  console.log('roomId', waitRoomId);
  const getAddress = `/sub/wait-room/${waitRoomId}`;
  const sendAddress = '/pub/wait-room';
  const myHeader = {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeTJAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsInVzZXJuYW1lIjoic3NhZnkyQG5hdmVyLmNvbSIsImlkIjoyLCJuaWNrbmFtZSI6InNzYWZ5MiIsInByb2ZpbGVJY29uIjoiQSIsImV4cCI6MTY4MDUyMjUyMH0.I7S5ewFqVfjPe7ljDQmFCM4PwB89djDCZ4z6oDUhDag',
  };

  // -------------------------SOCKET action-----------------------------

  // 받은 메세지 파싱
  const handleMessage = (received) => {
    console.log('handleMessage active');
    const newMessage = JSON.parse(received.body);
    console.log(newMessage);
  };

  // 메세지 받기 - Params 확인완료
  const getMessage = (subAddress, handleData, header) => {
    console.log('getMessage active');
    stomp.subscribe(subAddress, handleData, header);
  };

  // 메세지 보내기
  const sendMessage = (subAddress, header, type, messageBody, handleData) => {
    console.log('sendMessage active');
    const message = JSON.stringify({
      type,
      messageBody,
    });
    console.log(subAddress);
    stomp.send(subAddress, header, message);
  };

  // -------------------------SOCKET connet-----------------------------

  const sock = new SockJs('http://j8c106.p.ssafy.io:8188/ws');
  const options = {
    debug: false,
    protocols: Stomp.VERSIONS.supportedProtocols(),
  };
  const stomp = StompJs.over(sock, options);

  const stompConnect = () => {
    stomp.debug = null;
    stomp.connect(
      {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeTJAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsInVzZXJuYW1lIjoic3NhZnkyQG5hdmVyLmNvbSIsImlkIjoyLCJuaWNrbmFtZSI6InNzYWZ5MiIsInByb2ZpbGVJY29uIjoiQSIsImV4cCI6MTY4MDUyNzk1MH0.3knaqR376NNVMSq8hdAbJzKrjcNwRG8nI6VzeZvsLkA',
      },
      () => {
        console.log('the connection is successful');
        stomp.subscribe(
          '/sub/wait-room/3b6b9f58-cea6-4372-874f-0f3da67c90e4',
          (data) => {
            console.log(data);
            const newMessage = JSON.parse(data.body);
            console.log(newMessage);
          },
          {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeTJAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsInVzZXJuYW1lIjoic3NhZnkyQG5hdmVyLmNvbSIsImlkIjoyLCJuaWNrbmFtZSI6InNzYWZ5MiIsInByb2ZpbGVJY29uIjoiQSIsImV4cCI6MTY4MDUyNzk1MH0.3knaqR376NNVMSq8hdAbJzKrjcNwRG8nI6VzeZvsLkA',
          },
        );

        stomp.send(
          '/pub/wait-room',
          {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeTJAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsInVzZXJuYW1lIjoic3NhZnkyQG5hdmVyLmNvbSIsImlkIjoyLCJuaWNrbmFtZSI6InNzYWZ5MiIsInByb2ZpbGVJY29uIjoiQSIsImV4cCI6MTY4MDUyNzk1MH0.3knaqR376NNVMSq8hdAbJzKrjcNwRG8nI6VzeZvsLkA',
          },
          JSON.stringify({
            type: 'ENTER',
            messageBody: {
              roomId: '3b6b9f58-cea6-4372-874f-0f3da67c90e4',
            },
          }),
        );
      },
      (error) => {
        console.log('Connection error:', error);
      },
    );
  };

  useEffect(() => {
    stompConnect();
  }, []);

  // -------------------------게임 데이터-----------------------------

  // 게임 설정 state
  const initial = {
    theme: null,
    turnPerTime: 'NO',
    startTime: null,
    totalTurn: null,
    memberIdList: [1, 2, 3, 4],
  };
  const [setting, setSetting] = useState(initial);
  const [isUserSetting, setIsUserSetting] = useState(false); // 사용자 설정 확인
  const [isValidSetting, setIsValidSetting] = useState(false); // 설정 유효성 검사

  // 게임 설정 action
  const getIsUserSetting = () => {
    setIsUserSetting(!isUserSetting);
  };
  const getTheme = (data) => {
    const newData = { ...setting, theme: data };
    setSetting(newData);
  };
  const getUserSetting = (newData) => {
    setSetting(newData);
  };

  useEffect(() => {
    const isValid = () => {
      if (setting.theme === null) {
        return false;
      }
      if (setting.theme === 'USER') {
        if (setting.turnPerTime === 'NO' || setting.startTime === null || setting.totalTurn === null) {
          return false;
        }
        return true;
      }
      return true;
    };
    setIsValidSetting(isValid());
  }, [setting]);

  // 게임 시작 action
  const handleStart = async (e) => {
    if (isValidSetting) {
      const gameInit = await startGameApi(setting);
      dispatch(setPlayerList(gameInit.gamerList));
      dispatch(setGameRoomId(gameInit.roomId));
      const myGameInfo = gameInit.gamerList.find((gamer) => gamer.userName === 'ssafy');
      dispatch(setGamerId(myGameInfo.gamerId));
      const turnReq = {
        gamerId: myGameInfo.gamerId,
        roomId: gameInit.roomId,
      };
      const gameData = await gameDataApi(turnReq);
      console.log('gameData', gameData);
      await Promise.all([
        dispatch(handleGetGameData(gameData.Stocks)),
        dispatch(handleGetStockInfomation(gameData.stockInformation)),
        dispatch(handleGetStockDescription(gameData.companyDetail)),
      ]);
      // 데이터 있는지 확인하고 네비게이트
      await navigate('/game');
    }
  };

  // 게임 나가기 action
  const handleBack = () => {
    dispatch(removeWaiterList());
  };
  return (
    <WaitingContainer>
      <WaitingListSection>
        {Array.from({ length: 4 }).map((_, i) => {
          if (i < waiterList.length) {
            return <WaitingListItem key={waiterList[i]} waiter={waiterList[i]} />;
          }
          // eslint-disable-next-line react/no-array-index-key
          return <NullListItem key={i} />;
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
            <BackButton to="/" onClick={handleBack} className="bg-[#E19999] hover:bg-[#976161]">
              나가기
            </BackButton>
            <button type="submit">SendMessage</button>
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
