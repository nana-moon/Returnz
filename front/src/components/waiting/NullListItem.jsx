import React from 'react';
import tw, { styled } from 'twin.macro';

export default function NullListItem() {
  return <UserContainer />;
}
const UserContainer = styled.div`
  ${tw`border bg-white rounded-xl w-[100%] min-h-[200px] flex flex-col justify-evenly items-center`}
`;
