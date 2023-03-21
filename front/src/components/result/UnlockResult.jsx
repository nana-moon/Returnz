import React from 'react';
import tw, { styled } from 'twin.macro';

export default function UnlockResult() {
  return <UnlockContainer>unlock</UnlockContainer>;
}

const UnlockContainer = styled.div`
  ${tw`border bg-white rounded-xl h-[80%]`}
`;
