import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';

export default function Chatting({ receivedMessage, getInputMessage }) {
  const [inputValue, setInputValue] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    setMessageList([...messageList, receivedMessage]);
    console.log('receivedMessage', receivedMessage);
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
        {messageList.reverse().map((chat, i) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <ChattingDiv key={i}>
              {chat?.nickname} {chat?.contents}
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
  ${tw`border bg-white rounded-xl w-[100%] h-[80%] p-2`}
`;
const ChattingBox = styled.div`
  ${tw`bg-white rounded-xl w-[100%] h-[calc(100%-35px)] flex flex-col-reverse overflow-y-auto`}
`;
const ChattingDiv = styled.div`
  ${tw`w-[100%] max-h-[80%] p-2`}
`;
const ChattingInput = styled.input`
  ${tw`border bg-[#EDEEFF] rounded-xl w-[100%] max-h-8 p-2`}
`;
