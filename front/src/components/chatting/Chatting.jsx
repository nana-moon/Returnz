import React from 'react';
import tw, { styled } from 'twin.macro';

export default function Chatting() {
  return (
    <ChattingContainer>
      <ChattingBox>chatting...</ChattingBox>
      <ChattingInput type="text" placeholder="메세지를 입력하세요" />
    </ChattingContainer>
  );
}
const ChattingContainer = styled.div`
  ${tw`border bg-white rounded-xl w-[100%] min-h-[200px] p-2`}
`;
const ChattingBox = styled.div`
  ${tw`bg-white rounded-xl w-[100%] min-h-[170px]`}
`;
const ChattingInput = styled.input`
  ${tw`border bg-[#EDEEFF] rounded-xl w-[100%] h-[20%] p-2`}
`;
