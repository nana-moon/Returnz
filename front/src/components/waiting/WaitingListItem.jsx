import React from 'react';
import tw, { styled } from 'twin.macro';
import { Avatar } from '@material-tailwind/react';

export default function WaitingListItem({ waiter }) {
  const { profileIcon, nickname, avgProfit } = waiter;
  const profilePath = `profile_pics/${profileIcon}.jpg`;

  let isUp;
  if (avgProfit > 0) {
    isUp = 'gain';
  } else if (avgProfit < 0) {
    isUp = 'lose';
  }
  return (
    <UserContainer>
      <Avatar size="xxl" variant="circular" src={profilePath} />
      <p className="text-xl font-bold">{nickname}</p>
      <div className="flex">
        평균 수익률 : <TextBox isUp={isUp}>{avgProfit.toFixed(2)} %</TextBox>{' '}
      </div>
    </UserContainer>
  );
}

const UserContainer = styled.div`
  ${tw`border bg-white rounded-xl w-[100%] min-h-[200px] flex flex-col justify-evenly items-center`}
`;

const TextBox = styled.div`
  ${(props) => (props.isUp === 'gain' ? tw`text-gain` : null)}
  ${(props) => (props.isUp === 'lose' ? tw`text-lose` : null)}
  ${tw`ml-2`}
`;
