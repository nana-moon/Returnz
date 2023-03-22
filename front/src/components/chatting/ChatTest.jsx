// import React from 'react';
// import SockJS from 'sockjs-client';

// export default function ChatTest() {
//   const socket = new SockJS('http://localhost:3000/chat');

//   socket.onopen = () => {
//     console.log('Connection opened');
//   };

//   socket.onmessage = (event) => {
//     console.log('Message received: ', event.data);
//   };

//   socket.onclose = () => {
//     console.log('Connection closed');
//   };

//   socket.send('Hello, server!');

//   // user join
//   socket.emit('join', { username: 'John' });

//   // setting update
//   socket.emit('settings-update', { difficulty: 'easy', gameMode: 'multiplayer' });

//   // chat
//   socket.emit('chat-message', { username: 'John', message: 'Hello, everyone!' });

//   socket.on('user-joined', (data) => {
//     // Update the list of users in the room
//   });

//   socket.on('settings-updated', (data) => {
//     // Update the game settings display
//   });

//   socket.on('chat-message-received', (data) => {
//     // Add the new message to the chat log
//   });
//   return <div>ChatTest</div>;
// }
