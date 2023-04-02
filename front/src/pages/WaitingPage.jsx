/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import Cookies from 'js-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startGameApi, gameDataApi, getNewsApi } from '../apis/gameApi';
import { getWaiterList } from '../store/roominfo/WaitRoom.selector';
import Chatting from '../components/chatting/Chatting';
import ThemeSetting from '../components/waiting/ThemeSetting';
import UserSetting from '../components/waiting/UserSetting';
import WaitingListItem from '../components/waiting/WaitingListItem';
import { removeWaiterList, setWaiterList } from '../store/roominfo/WaitRoom.reducer';
import NullListItem from '../components/waiting/NullListItem';
import {
  setGameId,
  setGamerId,
  setGameRoomId,
  setHostNickname,
  setPlayerList,
} from '../store/roominfo/GameRoom.reducer';
import {
  handleGetGameData,
  handleGetStockDescription,
  handleGetTodayDate,
  handleGetStockInformation,
  handleGetStockNews,
  handleGetchangeInterest,
} from '../store/gamedata/GameData.reducer';
import { getMessage, sendMessage, stompConnect, stompDisconnect } from '../utils/Socket';

export default function WaitingPage() {
  // HOOKS
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // -------------------------| WAITROOM |------------------------------------------------------------------

  // ROOM STATE
  const roomInfo = location.state;

  // HOST STATE
  const myId = Cookies.get('id');
  const myEmail = Cookies.get('email');
  const myProfile = Cookies.get('profileIcon');
  const myNickname = Cookies.get('nickname');
  const isHost = myEmail === roomInfo.captainName;
  const newWaiter = { id: myId, username: myEmail, nickname: myNickname, profile: myProfile, avgProfit: null };

  // WAITER STATE
  const waiterList = useSelector(getWaiterList);

  // ADD WAITER ACTION
  useEffect(() => {
    dispatch(setWaiterList(newWaiter));
  }, []);

  // -------------------------| SOCKET |------------------------------------------------------------------

  // -------------------------SOCKET STATE-----------------------------
  const ACCESS_TOKEN = Cookies.get('access_token');
  const waitRoomId = roomInfo.roomId;
  const subAddress = `/sub/wait-room/${waitRoomId}`;
  const sendAddress = '/pub/wait-room';
  const header = {
    Authorization: ACCESS_TOKEN,
  };

  // -------------------------HANDLE A RECEIVED MESSAGE-----------------------------
  const handleMessage = (received) => {
    console.log('handleMessage active');
    const newMessage = JSON.parse(received.body);
    // -------------------------handle ENTER-----------------------------
    if (newMessage.type === 'ENTER') {
      console.log('ENTER 메세지 도착', newMessage.messageBody);
      const { roomId, id, username, nickname, profileIcon, avgProfit, captainName } = newMessage.messageBody;
    }
    // -------------------------handle CHAT-----------------------------
    if (newMessage.type === 'CHAT') {
      console.log('CHAT 메세지 도착', newMessage.messageBody);
      const { roomId, nickname, contents } = newMessage.messageBody;
      setReceivedMessage({ nickname, contents });
    }
    // -------------------------handle SETTING-----------------------------
    if (newMessage.type === 'SETTING') {
      console.log('SETTING 메세지 도착', newMessage.messageBody);
      const { roomId, theme, turnPerTime, startTime, totalTurn } = newMessage.messageBody;
    }
    // -------------------------handle GAME_INFO-----------------------------
    if (newMessage.type === 'GAME_INFO') {
      console.log('GAME_INFO 메세지 도착', newMessage.messageBody);
      const { roomId, gameRoomId } = newMessage.messageBody;
    }
    // -------------------------handle EXIT-----------------------------
    if (newMessage.type === 'EXIT') {
      console.log('EXIT 메세지 도착', newMessage.messageBody);
    }
  };

  // -------------------------SOCKET CONNECT-----------------------------
  const socketAction = () => {
    console.log('the connection is successful');
    getMessage(subAddress, handleMessage, header);
    sendMessage(sendAddress, header, 'ENTER', { roomId: waitRoomId });
  };

  useEffect(() => {
    // SOCKET CONNECT
    stompConnect(header, socketAction);
  }, []);

  // -------------------------| CHAT |------------------------------------------------------------------

  const [receivedMessage, setReceivedMessage] = useState('');
  const getInputMessage = (inputMessage) => {
    console.log('inputMessage in waitingPage', inputMessage);
    sendMessage(sendAddress, header, 'CHAT', { roomId: waitRoomId, contents: inputMessage });
  };

  // -------------------------| SETTING GAME |------------------------------------------------------------------

  // SETTING GAME STATE
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

  // SETTING GAME ACTION
  const getIsUserSetting = () => {
    setIsUserSetting(!isUserSetting);
  };
  const getTheme = (data) => {
    const newData = { ...setting, theme: data };
    sendMessage(sendAddress, header, 'SETTING', {
      roomId: waitRoomId,
      theme: data,
      turnPerTime: setting.turnPerTime,
      startTime: setting.startTime,
      totalTurn: setting.totalTurn,
    });
    setSetting(newData);
  };
  const getUserSetting = (newData) => {
    console.log(newData);
    setSetting(newData);
    sendMessage(sendAddress, header, 'SETTING', {
      roomId: waitRoomId,
      theme: newData.theme,
      turnPerTime: newData.turnPerTime,
      startTime: newData.startTime,
      totalTurn: newData.totalTurn,
    });
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

  // -------------------------| START/EXIT GAME |------------------------------------------------------------------
  // FIRST TURN INFO ACTION
  const handleGameInfo = async () => {
    if (isValidSetting) {
      const gameInit = await startGameApi(setting);
      sendMessage(sendAddress, header, 'GAME_INFO', {
        roomId: waitRoomId,
        id: gameInit.Id,
        gamerList: gameInit.gamerList,
        gameRoomId: gameInit.roomId,
      });
      dispatch(setGameId(gameInit.id));
      dispatch(setGameRoomId(gameInit.roomId));
      dispatch(setHostNickname(roomInfo.captainName));
      dispatch(setPlayerList(gameInit.gamerList));
      const myGameInfo = gameInit.gamerList.find((gamer) => gamer.username === myEmail);
      dispatch(setGamerId(myGameInfo.gamerId));
      const turnReq = {
        gamerId: myGameInfo.gamerId,
        roomId: gameInit.roomId,
      };
      handleTurn(turnReq, gameInit.id);
    }
  };

  const handleTurn = async (turnReq, id) => {
    const gameData = await gameDataApi(turnReq);
    console.log('gameData', gameData);
    dispatch(handleGetGameData(gameData.Stocks));
    dispatch(handleGetStockInformation(gameData.stockInformation));
    dispatch(handleGetStockDescription(gameData.companyDetail));
    dispatch(handleGetchangeInterest(gameData.exchangeInterest));
    const keys = Object.keys(gameData.Stocks);
    const Date = gameData.currentDate;
    const gameId = id;
    console.log(keys, Date, gameId, '가능');
    const getNews = [];

    for (let i = 0; i < keys.length; i += 1) {
      const data = {
        id: gameId,
        companyCode: keys[i],
        articleDateTime: Date,
      };
      // eslint-disable-next-line no-await-in-loop
      const newsTmp = await getNewsApi(data);
      getNews.push({ [keys[i]]: newsTmp });
    }

    dispatch(handleGetStockNews(getNews));

    dispatch(handleGetTodayDate(gameData.currentDate));
    sendMessage(sendAddress, header, 'EXIT', { roomId: waitRoomId });
    navigate('/game');
  };

  // START GAME ACTION
  const handleStart = async (e) => {
    // update memberlist and setting
    const memberIdList = waiterList.map((waiter) => {
      return waiter.id;
    });
    const newSetting = { ...setting, memberIdList };
    setSetting(newSetting);
    handleGameInfo();
  };

  // 방나가기 ACTION
  const handleExit = () => {
    // SOCKET DISCONNECT
    stompDisconnect(subAddress, header);
    dispatch(removeWaiterList());
  };

  useEffect(() => {
    return () => {
      handleExit();
    };
  }, []);

  // -------------------------| RETURN HTML |------------------------------------------------------------------
  return (
    <WaitingContainer>
      <TopSection>
        {Array.from({ length: 4 }).map((_, i) => {
          if (i < waiterList.length) {
            return <WaitingListItem key={waiterList[i]} waiter={waiterList[i]} />;
          }
          // eslint-disable-next-line react/no-array-index-key
          return <NullListItem key={i} />;
        })}
      </TopSection>
      <BottomSection>
        {!isUserSetting && <ThemeSetting getIsUserSetting={getIsUserSetting} getTheme={getTheme} />}
        {isUserSetting && (
          <UserSetting setting={setting} getIsUserSetting={getIsUserSetting} getUserSetting={getUserSetting} />
        )}
        <ChatSection>
          <Chatting receivedMessage={receivedMessage} getInputMessage={getInputMessage} />
          <BtnBox>
            {isHost && (
              <StartButton onClick={handleStart} disabled={!isValidSetting}>
                시작하기
              </StartButton>
            )}
            <ExitButton to="/" onClick={handleExit} className="bg-[#E19999] hover:bg-[#976161]">
              나가기
            </ExitButton>
          </BtnBox>
        </ChatSection>
      </BottomSection>
    </WaitingContainer>
  );
}

const WaitingContainer = styled.div`
  ${tw`w-[75%]`}
`;
const TopSection = styled.section`
  ${tw`flex gap-5 mt-10 min-h-[250px]`}
`;
const BottomSection = styled.section`
  ${tw`flex gap-5 mt-10 min-h-[250px]`}
`;
const ChatSection = styled.section`
  ${tw`w-[50%] min-h-[80%]`}
`;
const BtnBox = styled.div`
  ${tw`min-h-[20%] flex gap-5 mt-5`}
`;
const StartButton = styled.button`
  ${tw`border rounded-xl w-[50%] min-h-[50px] flex justify-center items-center text-white text-xl font-bold transition-colors`}
  ${({ disabled }) => (disabled ? tw`bg-primary hover:bg-none` : tw`bg-primary hover:bg-dprimary`)}
`;
const ExitButton = styled(Link)`
  ${tw`border rounded-xl w-[50%] min-h-[50px] flex justify-center items-center text-white text-xl font-bold transition-colors`}
`;
