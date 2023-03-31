// import React from 'react';
// import SockJs from 'sockjs-client';
// import Stomp from 'webstomp-client';
// import StompJs from 'stompjs';
// import Cookies from 'js-cookie';

// export default function useSocket() {
//   // Socket Function
//   const handleMessage = (received) => {
//     const newMessage = JSON.parse(received.body);
//     console.log(newMessage);
//   };
//   const getMessage = (subAddress, handleData) => {
//     const header = {
//       Authorization: ACCESS_TOKEN,
//     };
//     stomp.subscribe(subAddress, handleData, header);
//   };
//   const sendMessage = (subAddress, type, messageBody) => {
//     const header = {
//       Authorization: ACCESS_TOKEN,
//     };
//     const message = JSON.stringify({
//       type,
//       messageBody,
//     });
//     stomp.send(subAddress, header, message);
//   };
//   return <div>useSocket</div>;
// }
