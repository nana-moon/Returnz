import React from 'react';
import tw, { styled } from 'twin.macro';

export default function ReturnGraph() {
  return <ReturnGraphContainer>ReturnGraph</ReturnGraphContainer>;
}

const ReturnGraphContainer = styled.div`
  ${tw`border-2 border-black bg-white h-[80%]`}
`;
