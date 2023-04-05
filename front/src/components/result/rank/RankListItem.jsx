import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Avatar } from '@material-tailwind/react';

export default function RankListItem({ user, getUser }) {
  const { rank, profile, nickname, profits } = user;
  const profilePath = `profile_pics/${profile}.jpg`;
  const rankIcon = ['🥇', '🥈', '🥉', '💸'];
  const handleResultInfo = () => {
    getUser(user);
  };
  return (
    <UserContainer onClick={handleResultInfo}>
      <p className="text-2xl my-auto mr-2">{rankIcon[rank - 1]}</p>
      <Avatar size="lg" className="border-2 border-negative" variant="circular" src={profilePath} />
      <div className="my-auto ml-2">
        <p className="font-bold">{nickname}</p>
        <div>수익률: {profits[profits.length - 1].totalProfitRate}%</div>
      </div>
    </UserContainer>
  );
}

const UserContainer = styled.button`
  ${tw`border h-[23%] w-[100%] p-2 flex relative drop-shadow-lg bg-white rounded-xl focus:drop-shadow-none`}
`;
