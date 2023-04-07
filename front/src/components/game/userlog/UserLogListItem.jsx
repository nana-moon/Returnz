import React from 'react';
import { Avatar } from '@material-tailwind/react';
import tw, { styled } from 'twin.macro';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { gamerDataList } from '../../../store/gamedata/GameData.selector';

export default function UserLogListItem({ player, isReady, getIsReady }) {
  // MY LOG
  const myUsername = Cookies.get('email');
  const myaccount = useSelector(gamerDataList);
  const {
    rank,
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
  console.log('playerInfo', player, rank, nickname);
  const isMe = myUsername === userName;

  // USER LOG
  const rankIcon = ['🥇', '🥈', '🥉', '💸'];
  const profilePath = `profile_pics/${userProfileIcon}.jpg`;

  // ready
  const handleIsReady = () => {
    getIsReady();
  };

  let isUp;
  if (totalEvaluationAsset - originDeposit > 0) {
    isUp = 'gain';
  } else if (totalEvaluationAsset - originDeposit < 0) {
    isUp = 'lose';
  }

  return (
    <UserLogItemContainer isMe={isMe} isReady={isReady.status}>
      <LeftSection>
        <UserBox>
          <p className="text-2xl m-0 p-0">{rankIcon[rank - 1]}</p>
          <Avatar size="sm" className="border-2 border-black m-0" variant="circular" src={profilePath} />
        </UserBox>
        <MyName className="text-xl">{nickname}</MyName>
        {isMe && (
          <ReadyBtn type="submit" onClick={handleIsReady} className="w-[100%]" disabled={isReady.status}>
            ready
          </ReadyBtn>
        )}
      </LeftSection>
      <RightSection>
        <div className="flex">
          <div className="w-[40%]">총 평가 자산 </div>
          <EvaluationAssetBox isUp={isUp}>: {totalEvaluationAsset.toLocaleString()} 원</EvaluationAssetBox>
        </div>
        <div className="flex">
          <div className="w-[40%]">평가손익 </div>

          {isUp === 'lose' ? (
            <EvaluationAssetBox isUp={isUp}>
              : {(totalEvaluationAsset - originDeposit).toLocaleString()}원 ({totalProfitRate} %){' '}
            </EvaluationAssetBox>
          ) : (
            <EvaluationAssetBox isUp={isUp}>
              : {(totalEvaluationAsset - originDeposit).toLocaleString()}원 (+{totalProfitRate} %){' '}
            </EvaluationAssetBox>
          )}
        </div>
        {isMe && (
          <MyBox>
            <CostBox>
              <Cost className="font-bold">예수금</Cost> <Won> {myaccount.deposit.toLocaleString()} 원 </Won>
            </CostBox>
            <CostBox>
              <Cost className="font-bold">총 매입금액</Cost> <Won> {myaccount.ammountOfBuy.toLocaleString()} 원 </Won>
            </CostBox>
            <CostBox>
              <Cost className="font-bold">총 평가금액</Cost> <Won> {totalEvaluationAsset.toLocaleString()} 원 </Won>
            </CostBox>
          </MyBox>
        )}
      </RightSection>
    </UserLogItemContainer>
  );
}

const UserLogItemContainer = styled.div`
  ${tw`border-2 bg-white rounded-xl flex p-5 gap-5 overflow-hidden`}
  ${(props) => (props.isMe ? tw`h-[40%]` : tw`h-[20%]`)}
  ${(props) => (props.isReady ? tw`bg-primary text-white` : tw``)}
`;

const LeftSection = styled.div`
  ${tw`flex flex-col justify-center gap-2 items-center w-[30%]`}
`;

const RightSection = styled.div`
  ${tw`flex flex-col justify-center gap-2 w-[70%] text-sm`}
`;

const UserBox = styled.div`
  ${tw`flex gap-2 justify-center`};
`;

const ReadyBtn = styled.button`
  ${tw`border-2 rounded-lg text-center`};
  ${({ disabled }) => (disabled ? tw`bg-negative` : tw`bg-primary shadow-current`)}
`;

const MyBox = styled.div`
  ${tw`flex justify-center items-center gap-2 text-xs text-center`};
`;

const CostBox = styled.div`
  ${tw``}
`;

const Cost = styled.span`
  text-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${tw`font-bold`}
`;

const Won = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${tw``}
`;

const EvaluationAssetBox = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${(props) => props.isUp === 'gain' && tw`text-gain`}
  ${(props) => props.isUp === 'lose' && tw`text-lose`}
  ${tw``};
`;

const MyName = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  ${tw`text-sm font-bold`}
`;
