import React from 'react';
import tw, { styled } from 'twin.macro';

export default function Chatting() {
  return <ChattingContainer>Chatting</ChattingContainer>;
}
const ChattingContainer = styled.div`
  ${tw`border-2 border-black w-[100%]`}
`;
