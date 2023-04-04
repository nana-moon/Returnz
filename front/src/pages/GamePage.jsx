import React, { useEffect, useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import SockJs from 'sockjs-client';
import Stomp from 'webstomp-client';
import StompJs from 'stompjs';
import { useNavigate } from 'react-router-dom';
import Rate from '../components/game/Rate';
import Stocks from '../components/game/StockList';
import HoldingList from '../components/game/HoldingList';
import Turn from '../components/game/Turn';
import Graph from '../components/game/Graph';
import StockInfo from '../components/game/StockInfo';
import Header from '../components/common/Header';
import {
  handleMoreGameData,
  handleUpdateHoldingData,
  handleGetTodayDate,
  handleGetStockInformation,
  handleGetStockNews,
  handleGetchangeInterest,
} from '../store/gamedata/GameData.reducer';
import { gamerStockList, todayDate, stockDataList, gameTurn } from '../store/gamedata/GameData.selector';
import UserLogList from '../components/game/userlog/UserLogList';
import Chatting from '../components/chatting/Chatting';
import { getGameId, getGameRoomId, getGamerId, getIsReadyList } from '../store/roominfo/GameRoom.selector';
import { selectedIdx, sellNeedData } from '../store/buysellmodal/BuySell.selector';
import { getNewsApi } from '../apis/gameApi';
import { resetGameRoom, resetIsReadyList, setIsReadyList, setPlayerList } from '../store/roominfo/GameRoom.reducer';

export default function GamePage() {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 주식 정보 STATE
  const stockdata = useSelector(stockDataList);
  const roomNum = useSelector(getGameRoomId);
  const gamerNum = useSelector(getGamerId);

  // 뉴스 STATE
  const gameId = useSelector(getGameId);
  const keys = Object.keys(stockdata);
  const Date = useSelector(todayDate);

  // TURN STATE
  const temp = useSelector(gameTurn);

  // TURN API
  const axiospost = async () => {
    console.log('realTurn', temp.nowTurn, temp.maxTurn);
    if (temp.nowTurn < temp.maxTurn) {
      // 뉴스
      const datas = {
        roomId: roomNum,
        gamerId: gamerNum,
      };

      await axios
        .post('/games/game', datas)
        .then((res) => {
          console.log('res데이터', res);
          // dispatch(setPlayerList(res.data.gamer));
          dispatch(handleMoreGameData(res.data.Stocks));
          dispatch(handleUpdateHoldingData(res.data.gamerStock));
          dispatch(handleGetStockInformation(res.data.stockInformation));
          dispatch(handleGetTodayDate(res.data.currentDate));
          dispatch(handleGetchangeInterest(res.data.exchangeInterest));
        })
        .catch((err) => {
          console.log(err);
        });

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
    } else {
      console.log('turn endendend');
      navigate('/result');
    }
  };

  // -------------------------| SOCKET |------------------------------------------------------------------

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
  const gameRoomId = useSelector(getGameRoomId);
  const isReadyList = useSelector(getIsReadyList);
  const subAddress = `/sub/game-room/${gameRoomId}`;
  const sendAddress = '/pub/game-room';
  const header = {
    Authorization: ACCESS_TOKEN,
  };

  // -------------------------HANDLE A RECEIVED MESSAGE-----------------------------
  const handleMessage = async (received) => {
    const newMessage = JSON.parse(received.body);
    // -------------------------handle READY-----------------------------
    if (newMessage.type === 'READY') {
      console.log('READY 메세지 도착', newMessage.messageBody);
      const { username } = newMessage.messageBody;
      // ready한 user의 ready 상태 바꾸기
      const newIsReadyList = isReadyList.map((isReady) => {
        if (Object.prototype.hasOwnProperty.call(isReady, username)) {
          return { ...isReady, [username]: true };
        }
        return isReady;
      });
      await dispatch(setIsReadyList(newIsReadyList));
      handleTurn(newIsReadyList);
    }
    // -------------------------handle CHAT-----------------------------
    if (newMessage.type === 'CHAT') {
      console.log('CHAT 메세지 도착', newMessage.messageBody);
      const { nickname, contents } = newMessage.messageBody;
      setReceivedMessage({ nickname, contents });
    }
  };

  // -------------------------SOCKET CONNECT-----------------------------

  useEffect(() => {
    const maxRetries = 5;
    let retryCount = 0;

    const retryConnect = () => {
      if (retryCount < maxRetries) {
        console.log(`WebSocket connection attempt ${retryCount + 1}`);
        stompConnect();
      } else {
        console.log('Max retries reached. Giving up.');
      }
    };

    const stompConnect = () => {
      stompRef.current.debug = null;
      stompRef.current.connect(
        header,
        () => {
          console.log('connect!!');
          stompRef.current.subscribe(subAddress, handleMessage, header);
        },
        (error) => {
          console.log('WebSocket connection error:', error);
          retryCount += 1;
          setTimeout(retryConnect, 3000); // Retry connection after 3 seconds
        },
      );
    };

    retryConnect();

    // Clean up when the component unmounts
    return () => {
      stompRef.current.disconnect();
    };
  }, []);

  // -------------------------| CHAT |------------------------------------------------------------------

  const [receivedMessage, setReceivedMessage] = useState('');
  const getInputMessage = (inputMessage) => {
    // Check WebSocket connection status
    if (stompRef.current.connected) {
      const message = JSON.stringify({
        type: 'CHAT',
        roomId: gameRoomId,
        messageBody: { contents: inputMessage },
      });

      stompRef.current.send(sendAddress, header, message);
    } else {
      console.log('WebSocket connection is not active.');
    }
  };
  // -------------------------| TURN |------------------------------------------------------------------
  const handleTurn = (newIsReadyList) => {
    console.log(newIsReadyList);
    const allReady = newIsReadyList.every((isReady) => {
      console.log(Object.values(isReady));
      return Object.values(isReady).every((value) => value === true);
    });
    console.log('allReady', allReady);
    if (allReady) {
      dispatch(resetIsReadyList());
      axiospost();
    }
  };
  // -------------------------| READY |------------------------------------------------------------------

  const getIsReady = () => {
    // Check WebSocket connection status
    if (stompRef.current.connected) {
      const message = JSON.stringify({
        type: 'READY',
        roomId: gameRoomId,
        messageBody: {},
      });

      stompRef.current.send(sendAddress, header, message);
    } else {
      console.log('WebSocket connection is not active.');
    }
  };

  // -------------------------| EXIT GAME |------------------------------------------------------------------

  const handleExit = () => {
    dispatch(resetGameRoom());
  };

  useEffect(() => {
    return () => {
      handleExit();
    };
  }, []);
  // -------------------------| RETURN HTML |------------------------------------------------------------------

  return (
    <>
      <Header />
      <GameContainer>
        <LeftSection>
          <Rate />
          <Stocks />
          <HoldingList />
        </LeftSection>
        <MiddleSection>
          <Turn />
          <Graph />
          <StockInfo />
        </MiddleSection>
        <RightSection>
          <UserLogList getIsReady={getIsReady} />
          <div className="h-[50%]">
            <Chatting receivedMessage={receivedMessage} getInputMessage={getInputMessage} />
          </div>
        </RightSection>
      </GameContainer>
    </>
  );
}
const GameContainer = styled.div`
  ${tw`grid grid-cols-12 gap-5 w-[100%] p-5 font-spoq mt-14`}
`;
const LeftSection = styled.div`
  max-height: 88vh;
  ${tw`col-span-3 gap-5 h-screen`};
`;
const MiddleSection = styled.div`
  max-height: 88vh;
  ${tw`col-span-6 gap-5`}
`;
const RightSection = styled.div`
  max-height: 88vh;
  ${tw`col-span-3 flex flex-col gap-5 h-screen`}
`;
