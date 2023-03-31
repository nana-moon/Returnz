import React from 'react';
import SockJs from 'sockjs-client';
import Stomp from 'webstomp-client';
import StompJs from 'stompjs';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { getWaitRoomId } from '../store/roominfo/WaitRoom.selector';

export default function Waitsock() {
  // socket 연결 시 사용할 데이터
  const ACCESS_TOKEN = Cookies('access_token');
  const waitRoomId = useSelector(getWaitRoomId);
  const waitAddress = `/sub/wait-room/${waitRoomId}`;

  // Socket Function
  const handleMessage = (received) => {
    const newMessage = JSON.parse(received.body);
    console.log(newMessage);
  };
  const getMessage = (subAddress, handleData) => {
    const header = {
      Authorization: ACCESS_TOKEN,
    };
    stomp.subscribe(subAddress, handleData, header);
  };
  const sendMessage = (subAddress, type, messageBody) => {
    const header = {
      Authorization: ACCESS_TOKEN,
    };
    const message = JSON.stringify({
      type,
      messageBody,
    });
    stomp.send(subAddress, header, message);
  };

  // Socket 설정
  const sock = new SockJs('http://j8c106.p.ssafy.io:8188/ws');
  const options = {
    debug: false,
    protocols: Stomp.VERSIONS.supportedProtocols(),
  };
  const stomp = StompJs.over(sock, options);

  const stompConnect = () => {
    try {
      stomp.debug = null;
      console.log('111');
      stomp.connect(
        {
          Authorization: ACCESS_TOKEN,
        },
        () => {
          getMessage(waitAddress, handleMessage);
          sendMessage(waitAddress, 'ENTER', { roomId: waitRoomId });
          sendMessage(waitAddress, 'CHAT', { roomId: waitRoomId, contents: 'chatting...' });
          sendMessage(waitAddress, 'EXIT', { roomId: waitRoomId });
        },
      );
    } catch (err) {
      console.log(err);
    }
  };
  stompConnect();

  return <div />;
}
