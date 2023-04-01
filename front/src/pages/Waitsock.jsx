// import React, { useEffect } from 'react';
// import SockJs from 'sockjs-client';
// import Stomp from 'webstomp-client';
// import StompJs from 'stompjs';
// import Cookies from 'js-cookie';
// import { useSelector } from 'react-redux';
// import { getWaitRoomId } from '../store/roominfo/WaitRoom.selector';

// export default function Waitsock() {
//   // Socket Function
//   // 받은 메세지 파싱
//   const handleMessage = (received) => {
//     const newMessage = JSON.parse(received.body);
//     console.log(newMessage);
//   };

//   // 메세지 받기
//   const getMessage = (subAddress, handleData, header) => {
//     stomp.subscribe(subAddress, handleData, header);
//   };

//   // 메세지 보내기
//   const sendMessage = (subAddress, header, type, messageBody) => {
//     const message = JSON.stringify({
//       type,
//       messageBody,
//     });
//     stomp.send(subAddress, header, message);
//   };
//   // ---------------------------------------------------------------------------------------------------------------------------
//   // Socket 설정
//   const sock = new SockJs('http://j8c106.p.ssafy.io:8188/ws');
//   const options = {
//     debug: false,
//     protocols: Stomp.VERSIONS.supportedProtocols(),
//   };
//   const stomp = StompJs.over(sock, options);

//   const stompConnect = () => {
//     try {
//       stomp.debug = null;
//       stomp.connect(myHeader, () => {
//         getMessage(waitAddress, handleMessage, myHeader);
//         sendMessage(waitAddress, myHeader, 'ENTER', { roomId: waitRoomId });
//         // sendMessage(waitAddress, 'CHAT', { roomId: waitRoomId, contents: 'chatting...' });
//         // sendMessage(waitAddress, 'EXIT', { roomId: waitRoomId });
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   stompConnect();

//   return <div />;
// }
