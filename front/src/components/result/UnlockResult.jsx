import React from 'react';
import tw, { styled } from 'twin.macro';

export default function UnlockResult() {
  return <UnlockContainer>unlock</UnlockContainer>;
}

const UnlockContainer = styled.div`
  ${tw`border-2 border-black h-[80%] bg-white`}
`;
