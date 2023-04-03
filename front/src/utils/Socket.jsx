import SockJs from 'sockjs-client';
import Stomp from 'webstomp-client';
import StompJs from 'stompjs';

// -------------------------SOCKET CONNECTOR-----------------------------

const sock = new SockJs('http://j8c106.p.ssafy.io:8188/ws');
const options = {
  debug: false,
  protocols: Stomp.VERSIONS.supportedProtocols(),
  reconnectDelay: 1000, // 재시도 간격 1초로 설정
  heartbeatIncoming: 4000, // 4초마다 서버로부터 heartbeat 메시지 받기
  heartbeatOutgoing: 4000, // 4초마다 서버로 heartbeat 메시지 보내기
};

// SOCKET MANAGER
const stomp = StompJs.over(sock, options);

// CONNECT SOCKET
const stompConnect = (header, socketAction) => {
  stomp.debug = null;
  // console.log('connect');
  stomp.onConnect = () => {
    console.log('WebSocket connection opened');
    // stomp.subscribe('/topic/example', socketAction); // 예시로 /topic/example 주제에 대한 구독
  };

  stomp.onStompError = (frame) => {
    console.error('WebSocket error:', frame);
  };

  stomp.onWebSocketClose = () => {
    console.log('WebSocket connection closed');
    setTimeout(() => stompConnect(header, socketAction), stomp.reconnectDelay);
  };
  console.log('connect');
  stomp.connect(header, socketAction, (error) => {
    console.log('connection error:', error);
    setTimeout(() => stompConnect(header, socketAction), stomp.reconnectDelay);
  });
};

// DISCONNECT SOCKET
const stompDisconnect = (subAddress, header) => {
  stomp.debug = null;
  stomp.disconnect(
    () => {
      stomp.unsubscribe(subAddress);
    },
    header,
    (error) => {
      console.log('Connection error:', error);
    },
  );
};

// -------------------------SOCKET ACTION-----------------------------

// 메세지 받기
const getMessage = (subAddress, handleMessage, header) => {
  console.log('getMessage active');
  stomp.subscribe(subAddress, handleMessage, header);
};

// 메세지 보내기
const sendMessage = (sendAddress, header, type, messageBody) => {
  console.log('sendMessage active');
  const message = JSON.stringify({
    type,
    messageBody,
  });
  stomp.send(sendAddress, header, message);
};

export { stomp, stompConnect, stompDisconnect, getMessage, sendMessage };
