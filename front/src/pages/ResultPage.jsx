import React, { useEffect, useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import SockJs from 'sockjs-client';
import Stomp from 'webstomp-client';
import StompJs from 'stompjs';
import ResultRank from '../components/result/rank/ResultRank';
import ResultInfo from '../components/result/info/ResultInfo';
import UnlockResult from '../components/result/UnlockResult';
import Chatting from '../components/chatting/Chatting';
import { resultApi } from '../apis/gameApi';

export default function ResultPage() {
  // HOOKS
  const location = useLocation();
  const { gameId, gameRoomId } = location.state;
  // -------------------------||| RESULT STATE |||------------------------------------------------------------------
  const init = [];
  const [result, setResult] = useState(init);

  useEffect(() => {
    async function fetchData() {
      const resultData = await resultApi({ gameRoomId: gameId });
      console.log('ResultData, resultpage, 27', resultData);
      setResult(resultData);
    }
    fetchData();
  }, []);

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
  const subAddress = `/sub/result-room/${gameRoomId}`;
  const sendAddress = '/pub/result-room';
  const header = {
    Authorization: ACCESS_TOKEN,
  };

  // -------------------------HANDLE A RECEIVED MESSAGE-----------------------------

  const handleMessage = (received) => {
    const newMessage = JSON.parse(received.body);
    // -------------------------handle CHAT-----------------------------
    if (newMessage.type === 'CHAT') {
      console.log('CHAT 메세지 도착', newMessage.messageBody);
      const { roomId, nickname, contents } = newMessage.messageBody;
      setReceivedMessage({ nickname, contents });
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
  }, [gameRoomId, ACCESS_TOKEN]);

  // -------------------------||| CHAT |||------------------------------------------------------------------

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

  // -------------------------||| TOGGLE USER LOG |||------------------------------------------------------------------
  const [selectedIdx, setSelectedIdx] = useState('');
  const getWho = (idx) => {
    console.log('idx', idx);
    setSelectedIdx(idx);
  };

  // -------------------------||| RETURN HTML |||------------------------------------------------------------------

  return (
    <ResultContainer>
      <ResultRank result={result} getWho={getWho} />
      <ResultInfo result={result} selectedIdx={selectedIdx} />
      <LeftBottomSection>
        <UnlockResult result={result} />
        <Button to="/">나가기</Button>
      </LeftBottomSection>
      <Chatting receivedMessage={receivedMessage} getInputMessage={getInputMessage} />
    </ResultContainer>
  );
}

const ResultContainer = styled.div`
  ${tw`gap-[20px] mt-[40px] w-[75%] grid h-[550px]`}
  grid-template: 3fr 2fr / 1fr 2fr;
`;

const LeftBottomSection = styled.div`
  ${tw`flex flex-col gap-5`}
`;

const Button = styled(Link)`
  ${tw`border bg-white rounded-xl w-[100%] min-h-[50px] flex justify-center items-center`}
`;
