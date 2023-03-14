import React from 'react';
import tw, { styled } from 'twin.macro';

export default function Main() {
  return <MainDiv>Returnz</MainDiv>;
}

const MainDiv = styled.div`
  ${tw`border-2 text-primary font-ibm font-bold`}
`;
