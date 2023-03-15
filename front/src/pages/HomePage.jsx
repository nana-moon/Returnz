import React from 'react';
import tw, { styled } from 'twin.macro';

export default function HomePage() {
  return <MainDiv>main</MainDiv>;
}

const MainDiv = styled.div`
  ${tw`border-2 text-primary font-ibm font-bold`}
`;
