import React from 'react';
import tw, { styled } from 'twin.macro';

export default function HomePage() {
  return (
    <MainDiv>
      <div className="m-3 text-xl text-gray-900 font-semibold">REACT TAILWIND</div>
    </MainDiv>
  );
}

const MainDiv = styled.div`
  ${tw`flex gap-6`}
`;
