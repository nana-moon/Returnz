import React from 'react';
import { Avatar } from '@material-tailwind/react';
import tw, { styled } from 'twin.macro';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { gamerDataList } from '../../../store/gamedata/GameData.selector';

export default function UserLogListItem({ player, isReady, getIsReady }) {
  // MY LOG
  const myUsername = Cookies.get('email');
  const {
    userName,
    nickname,
    userProfileIcon,
    deposit,
    originDeposit,
    totalPurchaseAmount,
    totalEvaluationAsset,
    totalEvaluationStock,
    totalProfitRate,
  } = player;
  const isMe = myUsername === userName;

  // USER LOG
  const profilePath = `profile_pics/${userProfileIcon}.jpg`;

  // ready
  const handleIsReady = () => {
    getIsReady();
  };

  return (
    <UserLogItemContainer isMe={isMe} isReady={isReady.status}>
      <LeftSection>
        <UserBox>
          <Avatar className="border-2 border-black" variant="circular" src={profilePath} />
          <div>{nickname}</div>
        </UserBox>
        {isMe && (
          <ReadyBtn type="submit" onClick={handleIsReady} className="w-[100%]" disabled={isReady.status}>
            ready
          </ReadyBtn>
        )}
      </LeftSection>
      <RightSection>
        <div className="mb-0">총 평가 자산 : {totalEvaluationAsset}</div>
        <div>평가손익 : {totalProfitRate}%</div>
        {isMe && (
          <MyBox>
            <div>예수금 {deposit}</div>
            <div>총매입금액 {totalPurchaseAmount}</div>
            <div>총평가금액 {totalEvaluationAsset}</div>
          </MyBox>
        )}
      </RightSection>
    </UserLogItemContainer>
  );
}

const UserLogItemContainer = styled.div`
  ${tw`border-2 bg-white rounded-xl flex p-5 gap-5`}
  ${(props) => (props.isMe ? tw`h-[40%]` : tw`h-[20%]`)}
  ${(props) => (props.isReady ? tw`bg-primary text-white` : tw``)}
`;

const LeftSection = styled.div`
  ${tw`flex flex-col justify-center gap-2 items-center w-[30%]`}
`;

const RightSection = styled.div`
  ${tw`flex flex-col justify-center gap-2 items-center  w-[70%] text-sm`}
`;

const UserBox = styled.div`
  ${tw`flex gap-2 items-center`};
`;

const ReadyBtn = styled.button`
  ${tw`border-2 rounded-lg text-center`};
  ${({ disabled }) => (disabled ? tw`bg-negative` : tw`bg-primary shadow-current`)}
`;

const MyBox = styled.div`
  ${tw`flex justify-center items-center gap-2 text-xs text-center`};
`;
