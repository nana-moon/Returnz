import React from 'react';
import tw, { styled } from 'twin.macro';
import { Avatar } from '@material-tailwind/react';

export default function WaitingListItem({ waiter }) {
  const { profileIcon, nickname, avgProfit } = waiter;
  const profilePath = `profile_pics/${profileIcon}.jpg`;
  return (
    <UserContainer>
      <Avatar size="xxl" variant="circular" src={profilePath} />
      <p className="text-xl">{nickname}</p>
      <p>평균 수익률 : {avgProfit}%</p>
    </UserContainer>
  );
}

const UserContainer = styled.div`
  ${tw`border bg-white rounded-xl w-[100%] min-h-[200px] flex flex-col justify-evenly items-center`}
`;
