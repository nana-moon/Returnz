import SockJs from 'sockjs-client';
import Stomp from 'webstomp-client';
import StompJs from 'stompjs';

// -------------------------SOCKET CONNECTOR-----------------------------

const sock = new SockJs('http://j8c106.p.ssafy.io:8188/ws');
const options = {
  debug: false,
  protocols: Stomp.VERSIONS.supportedProtocols(),
};

// SOCKET MANAGER
const stomp = StompJs.over(sock, options);

// CONNECT SOCKET
const stompConnect = (header, socketAction) => {
  stomp.debug = null;
  stomp.connect(header, socketAction, (error) => {
    console.log('connection error:', error);
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
