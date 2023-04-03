import React from 'react';
import { Avatar } from '@material-tailwind/react';
import tw, { styled } from 'twin.macro';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { gamerDataList } from '../../../store/gamedata/GameData.selector';

export default function UserLogListItem({ player, isReady, getIsReady }) {
  // MY LOG
  const myNicmname = Cookies.get('nickname');
  const myUsername = Cookies.get('email');
  const isMe = myNicmname === player.nickname;
  const infoId = { seed: 5000000, buy: 100000, eval: 10000000 };
  const myInfo = useSelector(gamerDataList);

  // USER LOG
  const profilePath = `profile_pics/${player.profileIcon}.jpg`;

  // ready
  const handleIsReady = () => {
    getIsReady();
  };

  return (
    <UserLogItemContainer isMe={isMe}>
      <LeftSection>
        <UserBox>
          <Avatar className="border-2 border-black" variant="circular" src={profilePath} />
          <div>{player.nickname}</div>
        </UserBox>
        {isMe && (
          <ReadyBtn
            type="submit"
            onClick={handleIsReady}
            className="w-[100%]"
            disabled={isReady[myUsername]}
            isReady={isReady}
          >
            ready
          </ReadyBtn>
        )}
      </LeftSection>
      <RightSection>
        <div className="mb-0">총 평가 자산 : {player.total}</div>
        <div>평가손익 : {player.profit}%</div>
        {isMe && (
          <MyBox>
            <div>예수금 {myInfo.deposit.toLocaleString()}</div>
            <div>총매입금액 {myInfo.ammountOfBuy.toLocaleString()}</div>
            <div>총평가금액 {infoId.eval}</div>
          </MyBox>
        )}
      </RightSection>
    </UserLogItemContainer>
  );
}

const UserLogItemContainer = styled.div`
  ${tw`border-2 bg-white rounded-xl flex p-5 gap-5`}
  ${(props) => (props.isMe ? tw`h-[40%]` : tw`h-[20%]`)}
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
