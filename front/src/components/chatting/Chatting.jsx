import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';

export default function Chatting({ receivedMessage, getInputMessage }) {
  const nickname = Cookies.get('nickname');
  const [inputValue, setInputValue] = useState('');
  const [messageList, setMessageList] = useState([]);
  const reversedMessages = [...messageList].reverse();

  useEffect(() => {
    if (receivedMessage) {
      setMessageList([...messageList, receivedMessage]);
      console.log('receivedMessage', receivedMessage);
    }
  }, [receivedMessage]);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleInputMessage = (e) => {
    if (e.keyCode === 13) {
      const inputMessage = e.target.value;
      getInputMessage(inputMessage);
      setInputValue('');
    }
  };

  return (
    <ChattingContainer>
      <ChattingBox>
        {reversedMessages.map((chat, i) => {
          const isMe = nickname === chat.nickname;
          return (
            // eslint-disable-next-line react/no-array-index-key
            <ChattingDiv key={i} isMe={isMe}>
              <NicknameSpan isMe={isMe} value={chat?.nickname}>
                {isMe ? '나' : chat?.nickname}
              </NicknameSpan>
              {chat?.contents}
            </ChattingDiv>
          );
        })}
      </ChattingBox>
      <ChattingInput
        value={inputValue}
        onChange={handleInputChange}
        type="text"
        placeholder="메세지를 입력하세요"
        onKeyUp={handleInputMessage}
      />
    </ChattingContainer>
  );
}
const ChattingContainer = styled.div`
  ${tw`border bg-white rounded-xl w-[100%] h-[100%] p-2`}
`;
const ChattingBox = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  ${tw`bg-white rounded-xl w-[100%] h-[calc(100%-35px)] flex flex-col-reverse overflow-y-auto`}
`;
const ChattingDiv = styled.div`
  ${tw`w-[100%] max-h-[80%] p-1`}
  ${({ isMe }) => (isMe ? tw`text-end` : tw``)}
`;
const NicknameSpan = styled.span`
  ${tw`mr-2 px-1 border rounded-xl`}
  ${({ isMe }) => (isMe ? tw`text-red-500 bg-red-50` : tw`text-blue-gray-500 bg-blue-gray-50`)}
`;
const ChattingInput = styled.input`
  ${tw`border bg-[#EDEEFF] rounded-xl w-[100%] max-h-8 p-2`}
`;
