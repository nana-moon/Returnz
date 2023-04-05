import React from 'react';
import tw, { styled } from 'twin.macro';

export default function UnlockResult() {
  return (
    <UnlockContainer>
      <UnlockContainerTitle>🏅이번 게임 성과</UnlockContainerTitle>
    </UnlockContainer>
  );
}

const UnlockContainer = styled.div`
  ${tw`border bg-white p-2 rounded-xl h-[80%] font-spoq`}
`;

const UnlockContainerTitle = styled.div`
  ${tw`text-center font-bold`}
`;
