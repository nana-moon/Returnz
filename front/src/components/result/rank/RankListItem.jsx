import React, { useState } from 'react';

import tw, { styled } from 'twin.macro';

export default function RankListItem({ user, getUser }) {
  const { rank, profile, nickname, returnRate } = user;
  const handleResultInfo = () => {
    getUser(user);
  };
  return (
    <UserContainer onClick={handleResultInfo}>
      <div>{rank}</div>
      <img src={profile} alt="" />
      <div>{nickname}</div>
      <div>{returnRate}</div>
    </UserContainer>
  );
}

const UserContainer = styled.button`
  ${tw`border h-[23%] w-[100%] p-2 flex relative drop-shadow-lg bg-white rounded-xl focus:drop-shadow-none`}
`;
