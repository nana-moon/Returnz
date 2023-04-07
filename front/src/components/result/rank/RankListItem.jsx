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

  let isUp = 'black';

  if (profits[user.profits.length - 1]?.totalProfitRate > 0) {
    isUp = 'gain';
  } else if (profits[user.profits.length - 1]?.totalProfitRate < 0) {
    isUp = 'lose';
  }
  return (
    <UserContainer onClick={handleResultInfo}>
      <p className="text-2xl my-auto mr-2">{rankIcon[rank - 1]}</p>
      <Avatar size="lg" className="border-2 border-negative" variant="circular" src={profilePath} />
      <div className="my-auto ml-2">
        <p className="font-bold text-left mb-2">{nickname}</p>
        <div className="flex">
          <p className="text-left mr-2">수익률: </p>
          <Profit isUp={isUp}> {profits[user.profits.length - 1]?.totalProfitRate}% </Profit>
        </div>
      </div>
    </UserContainer>
  );
}

const UserContainer = styled.button`
  ${tw`border h-[23%] w-[100%] p-2 flex items-center relative drop-shadow-lg bg-white rounded-xl focus:drop-shadow-none`}
`;

const Profit = styled.div`
  ${(props) => (props.isUp === 'gain' ? tw`text-gain` : null)}
  ${(props) => (props.isUp === 'lose' ? tw`text-lose` : null)}
  ${tw``}
`;
