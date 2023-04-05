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
import { startGameApi, gameDataApi, getNewsApi } from '../apis/gameApi';
import { getCaptainName, getMemberCount, getWaiterList, getWaitRoomId } from '../store/roominfo/WaitRoom.selector';
import Chatting from '../components/chatting/Chatting';
import ThemeSetting from '../components/waiting/ThemeSetting';
import UserSetting from '../components/waiting/UserSetting';
import WaitingListItem from '../components/waiting/WaitingListItem';
import { setWaitRoomId, addWaiter, resetWaitRoom } from '../store/roominfo/WaitRoom.reducer';
import NullListItem from '../components/waiting/NullListItem';
import {
  resetGameRoom,
  setGameId,
  setGamerId,
  setGameRoomId,
  setHostNickname,
  setInitIsReadyList,
  setIsReadyList,
  setPlayerList,
} from '../store/roominfo/GameRoom.reducer';
import {
  handleGetGameData,
  handleGetStockDescription,
  handleGetTodayDate,
  handleGetStockInformation,
  handleGetStockNews,
  handleGetchangeInterest,
  setMaxTurn,
} from '../store/gamedata/GameData.reducer';
import LoadPage from '../components/loading/LoadPage';

export default function WaitingPage() {
  // -------------------------||| HOOKS |||------------------------------------------------------------------

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // -------------------------||| WAITROOM STATE |||------------------------------------------------------------------

  const myEmail = Cookies.get('email');

  const waitRoomId = useSelector(getWaitRoomId);
  const captainName = useSelector(getCaptainName);
  const memberCount = useSelector(getMemberCount);
  const waiterList = useSelector(getWaiterList);

  const isHost = myEmail === captainName;

  // -------------------------||| SOCKET |||------------------------------------------------------------------

  // -------------------------SOCKET MANAGER-----------------------------

  const stompRef = useRef(null);
  if (!stompRef.current) {
    const sock = new SockJs('http://j8c106.p.ssafy.io:8188/ws');
    const options = {
      debug: false,
      protocols: Stomp.VERSIONS.supportedProtocols(),
    };
    stompRef.current = StompJs.over(sock, options);
  }

  // -------------------------SOCKET STATE-----------------------------

  const ACCESS_TOKEN = Cookies.get('access_token');
  const subAddress = `/sub/wait-room/${waitRoomId}`;
  const sendAddress = '/pub/wait-room';
  const header = {
    Authorization: ACCESS_TOKEN,
  };

  // -------------------------HANDLE A RECEIVED MESSAGE-----------------------------
  const handleMessage = (received) => {
    const newMessage = JSON.parse(received.body);
    // -------------------------handle ENTER-----------------------------
    if (newMessage.type === 'ENTER') {
      console.log('ENTER 메세지 도착', newMessage.messageBody);
      const { roomId, memberId, username, nickname, profileIcon, avgProfit } = newMessage.messageBody;
      dispatch(addWaiter(newMessage.messageBody));
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
      // const { roomId, theme, turnPerTime, startTime, totalTurn } = newMessage.messageBody;
    }
    // -------------------------handle GAME_INFO-----------------------------
    if (newMessage.type === 'GAME_INFO') {
      console.log('GAME_INFO 메세지 도착', newMessage.messageBody);
      const { roomId, gameRoomId } = newMessage.messageBody;
    }
    // -------------------------handle EXIT-----------------------------
    if (newMessage.type === 'EXIT') {
      console.log('EXIT 메세지 도착', newMessage.messageBody);
      // setGameRoomId
      navigate('/game', { state: newMessage.messageBody });
    }
  };
  // -------------------------SOCKET CONNECT-----------------------------
  useEffect(() => {
    const stompConnect = () => {
      stompRef.current.debug = null;
      stompRef.current.connect(
        header,
        () => {
          stompRef.current.subscribe(subAddress, handleMessage, header);
        },
        (error) => {
          console.log('WebSocket connection error:', error);
        },
      );
    };

    stompConnect();

    // Clean up when the component unmounts
    return () => {
      stompRef.current.disconnect();
    };
  }, []);

  // -------------------------||| CHAT |||------------------------------------------------------------------

  const [receivedMessage, setReceivedMessage] = useState('');
  const getInputMessage = (inputMessage) => {
    console.log('inputMessage in waitingPage', inputMessage);
    if (stompRef.current.connected) {
      const message = JSON.stringify({
        type: 'CHAT',
        messageBody: { roomId: waitRoomId, contents: inputMessage },
      });
      stompRef.current.send(sendAddress, header, message);
    } else {
      console.log('WebSocket connection is not active.');
    }
  };

  // -------------------------||| SETTING |||------------------------------------------------------------------

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
  // -------------------------SET THEME-----------------------------

  const getTheme = (selectedTheme) => {
    const newData = { ...setting, theme: selectedTheme };
    const message = JSON.stringify({
      type: 'SETTING',
      messageBody: {
        roomId: waitRoomId,
        theme: selectedTheme,
        turnPerTime: 'NO',
        startTime: null,
        totalTurn: null,
      },
    });
    stompRef.current.send(sendAddress, header, message);
    setSetting(newData);
  };
  // -------------------------IS USER-----------------------------

  const getIsUserSetting = () => {
    setIsUserSetting(!isUserSetting);
  };

  // -------------------------SET USER SETTING-----------------------------

  const getUserSetting = (newData) => {
    const message = JSON.stringify({
      type: 'SETTING',
      messageBody: {
        roomId: waitRoomId,
        theme: newData.theme,
        turnPerTime: newData.turnPerTime,
        startTime: newData.startTime,
        totalTurn: newData.totalTurn,
      },
    });
    stompRef.current.send(sendAddress, header, message);
    setSetting(newData);
  };

  // -------------------------VALIDATION PER SET-----------------------------

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

  // -------------------------||| START GAME |||------------------------------------------------------------------

  // -------------------------NAVIGATE TO GAMEROOM-----------------------------

  const handlePage = () => {
    navigate('/game');
  };

  // -------------------------GET FIRST TURN DATA-----------------------------

  const handleTurn = async (turnApiReq, id) => {
    const gameData = await gameDataApi(turnApiReq);
    console.log('turn data, waitingpage, 249', gameData.gamer);
    dispatch(setPlayerList(gameData.gamer));
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
    handlePage();
  };

  // -------------------------GET GAMEROOM INFO-----------------------------

  const handleGameInfo = async (newSetting) => {
    if (isValidSetting) {
      const gameInit = await startGameApi(newSetting);
      console.log('gameInit', gameInit);
      dispatch(setMaxTurn(gameInit.totalTurn));
      dispatch(setGameId(gameInit.id)); // gameId
      dispatch(setGameRoomId(gameInit.roomId)); // gameRoomId
      dispatch(setHostNickname(captainName)); // captainName
      const myGameInfo = gameInit.gamerList.find((gamer) => gamer.username === myEmail);
      dispatch(setGamerId(myGameInfo.gamerId)); // myGameId
      const turnApiReq = {
        gamerId: myGameInfo.gamerId,
        roomId: gameInit.roomId,
      };
      await handleTurn(turnApiReq, gameInit.id);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  // -------------------------GET FIRST TURN DATA-----------------------------

  const handleStart = async (e) => {
    try {
      setIsLoading(true);
      const memberIdList = waiterList.map((waiter) => {
        return waiter.id;
      });
      const newSetting = { ...setting, memberIdList };
      setSetting(newSetting);
      await handleGameInfo(newSetting);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // -------------------------||| EXIT WAITROOM |||------------------------------------------------------------------

  const handleExit = () => {
    dispatch(resetWaitRoom());
  };

  useEffect(() => {
    return () => {
      handleExit();
    };
  }, []);

  // -------------------------||| RETURN HTML |||------------------------------------------------------------------
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isLoading ? (
        <LoadPage />
      ) : (
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
            <BottomRightSection>
              <ChattingBox>
                <Chatting receivedMessage={receivedMessage} getInputMessage={getInputMessage} />
              </ChattingBox>
              <ButtonBox>
                {isHost && (
                  <StartButton onClick={handleStart} disabled={!isValidSetting}>
                    시작하기
                  </StartButton>
                )}
                <ExitButton to="/" onClick={handleExit} className="bg-[#E19999] hover:bg-[#976161]">
                  나가기
                </ExitButton>
              </ButtonBox>
            </BottomRightSection>
          </BottomSection>
        </WaitingContainer>
      )}
    </>
  );
}
const WaitingContainer = styled.div`
  ${tw`w-[75%]`}
`;
const TopSection = styled.section`
  ${tw`flex gap-5 mt-10 min-h-[200px]`}
`;
const BottomSection = styled.section`
  ${tw`flex gap-5 mt-10 h-[300px]`}
`;
const BottomRightSection = styled.section`
  ${tw`w-[50%] h-auto`}
`;
const ChattingBox = styled.section`
  ${tw`w-[100%] h-[80%]`}
`;
const ButtonBox = styled.div`
  ${tw`h-[10%] flex gap-5 mt-2`}
`;
const StartButton = styled.button`
  ${tw`border rounded-xl w-[50%] min-h-[50px] flex justify-center items-center text-white text-xl font-bold transition-colors`}
  ${({ disabled }) => (disabled ? tw`bg-primary hover:bg-none` : tw`bg-primary hover:bg-dprimary`)}
`;
const ExitButton = styled(Link)`
  ${tw`border rounded-xl w-[50%] min-h-[50px] flex justify-center items-center text-white text-xl font-bold transition-colors`}
`;
