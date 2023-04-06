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
import { setWaitRoomId, addWaiter, resetWaitRoom, setTheme, setCustom } from '../store/roominfo/WaitRoom.reducer';
import NullListItem from '../components/waiting/NullListItem';
import {
  resetGameRoom,
  setCaptainName,
  setGameId,
  setGamerId,
  setGameRoomId,
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
import RequestQueue from '../utils/RequestQueue';

const requestQueue = new RequestQueue();

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
      const { roomId, theme, turnPerTime, startTime, totalTurn } = newMessage.messageBody;
      dispatch(setTheme(theme));
      dispatch(setCustom({ turnPerTime, startTime, totalTurn }));
    }
    // -------------------------handle GAME_INFO-----------------------------
    if (newMessage.type === 'GAME_INFO') {
      console.log('GAME_INFO 메세지 도착', newMessage.messageBody);
      const { roomId, gameInit } = newMessage.messageBody;
      console.log('gameInit3 in handle game_info (received)', gameInit);

      handleSave(gameInit);
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
    setIsLoading(false);
    navigate('/game');
  };

  // -------------------------REQUEST FIRST TURN DATA-----------------------------

  const handleTurn = async (turnApiReq, id) => {
    // turn API
    const gameData = await requestQueue.addRequest(() => gameDataApi(turnApiReq));
    console.log('turn data, waitingpage, 249', gameData.gamer);
    dispatch(setPlayerList(gameData.gamer));
    dispatch(handleGetGameData(gameData.Stocks));
    dispatch(handleGetStockInformation(gameData.stockInformation));
    dispatch(handleGetStockDescription(gameData.companyDetail));
    dispatch(handleGetchangeInterest(gameData.exchangeInterest));
    const keys = Object.keys(gameData.Stocks);
    const Date = gameData.currentDate;
    const gameId = id;
    // news API
    const newsCache = new Map();

    const getNewsApiWithCache = async (data) => {
      const cacheKey = `${data.id}_${data.companyCode}_${data.articleDateTime}`;
      if (newsCache.has(cacheKey)) {
        return newsCache.get(cacheKey);
      }

      const news = await requestQueue.addRequest(() => getNewsApi(data));
      newsCache.set(cacheKey, news);
      return news;
    };

    const getNews = [];

    for (let i = 0; i < keys.length; i += 1) {
      const data = {
        id: gameId,
        companyCode: keys[i],
        articleDateTime: Date,
      };
      // eslint-disable-next-line no-await-in-loop
      const newsTmp = await getNewsApiWithCache(data);
      getNews.push({ [keys[i]]: newsTmp });
    }

    dispatch(handleGetStockNews(getNews));
    dispatch(handleGetTodayDate(gameData.currentDate));
    handlePage();
  };

  // -------------------------SEND GAME_INFO-----------------------------

  const sendMessage = (gameInit) => {
    console.log('gameInit2 in send game_info', gameInit);
    const gameRoomId = gameInit.roomId;
    if (stompRef.current.connected) {
      const message = JSON.stringify({
        type: 'GAME_INFO',
        messageBody: { roomId: waitRoomId, gameRoomId, gameInit },
      });
      stompRef.current.send(sendAddress, header, message);
    } else {
      console.log('WebSocket connection is not active.');
    }
  };

  // -------------------------SAVE GAMEROOM INFO-----------------------------
  const handleSave = async (gameInit) => {
    dispatch(setMaxTurn(gameInit.totalTurn)); // maxTurn
    dispatch(setGameId(gameInit.id)); // gameId
    dispatch(setGameRoomId(gameInit.roomId)); // gameRoomId
    dispatch(setCaptainName(captainName)); // captainName
    const myGameInfo = gameInit.gamerList.find((gamer) => gamer.username === myEmail);
    console.log('myGameInfo--------------------------', myGameInfo);
    dispatch(setGamerId(myGameInfo.gamerId)); // myGameId

    // send game info
    console.log('gameInit1 in save gameroom info', gameInit);

    // first turn api
    const turnApiReq = {
      gamerId: myGameInfo.gamerId,
      roomId: gameInit.roomId,
      captain: isHost,
    };
    await handleTurn(turnApiReq, gameInit.id);
  };

  // -------------------------REQUEST GAMEROOM INFO-----------------------------

  const handleGameInfo = async (newSetting) => {
    if (isValidSetting) {
      // game room info api
      const gameInit = await startGameApi(newSetting);
      await sendMessage(gameInit);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  // -------------------------CLICK START-----------------------------

  const handleStart = async (e) => {
    try {
      setIsLoading(true);
      const memberIdList = waiterList.map((waiter) => {
        return waiter.memberId;
      });
      const newSetting = { ...setting, memberIdList };
      setSetting(newSetting);
      await handleGameInfo(newSetting);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      // setIsLoading(false);
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
          <TickerWrapper>
            <TickerText>
              TIP. 우선주는 일반적으로 보통주보다 재산적 내용(이익, 이자배당, 잔여재산 분배 등)에 있어서 우선적 지위가
              인정되는 주식입니다. 그 대가로 우선주 소유자는 주주총회에서의 의결권을 포기해야 합니다.
            </TickerText>
          </TickerWrapper>
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
  ${tw`h-[10%] flex justify-center gap-5 mt-2`}
`;
const StartButton = styled.button`
  ${tw`border rounded-xl w-[50%] min-h-[50px] flex justify-center items-center text-white text-xl font-bold transition-colors`}
  ${({ disabled }) => (disabled ? tw`bg-primary hover:bg-none` : tw`bg-primary hover:bg-dprimary`)}
`;
const ExitButton = styled(Link)`
  ${tw`border rounded-xl w-[50%] min-h-[50px] flex justify-center items-center text-white text-xl font-bold transition-colors`}
`;
const TickerWrapper = styled.div`
  position: absolute;
  left: 0px;
  overflow: hidden;
`;
const TickerText = styled.p`
  display: inline-block;
  white-space: nowrap;
  animation: ticker 20s linear infinite;
  @keyframes ticker {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;
