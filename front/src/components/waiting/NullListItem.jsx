import React from 'react';
import tw, { styled } from 'twin.macro';

export default function NullListItem() {
  return <NullContainer />;
}
const NullContainer = styled.div`
  ${tw`border bg-white rounded-xl w-[100%] min-h-[20%] flex flex-col justify-evenly items-center`}
`;
