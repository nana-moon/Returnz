import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Avatar } from '@material-tailwind/react';

export default function RankListItem({ user, idx, getWho }) {
  const { id, rank, profile, nickname, profits } = user;
  const profilePath = `profile_pics/${profile}.jpg`;
  const rankIcon = ['🥇', '🥈', '🥉', '💸'];
  const handleResultInfo = () => {
    getWho(idx);
  };
  return (
    <UserContainer onClick={handleResultInfo}>
      <p className="text-3xl">{rankIcon[rank - 1]}</p>
      <Avatar size="lg" variant="circular" src={profilePath} />
      <p className="col-span-2">{nickname}</p>
      <div>{profits[profits.length - 1].totalProfitRate}</div>
    </UserContainer>
  );
}

const UserContainer = styled.button`
  ${tw`border h-[23%] w-[100%] p-2 grid grid-cols-5 grid-rows-1 items-center relative drop-shadow-lg bg-white rounded-xl focus:drop-shadow-none`}
`;
