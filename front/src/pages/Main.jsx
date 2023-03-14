import React from 'react';
import tw, { styled } from 'twin.macro';

export default function Main() {
  return <MainDiv>Main</MainDiv>;
}

const MainDiv = styled.div`
  ${tw`border-2 text-primary`}
`;
