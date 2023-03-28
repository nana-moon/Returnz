import React from 'react';
import tw, { styled } from 'twin.macro';
import { Avatar } from '@material-tailwind/react';

export default function UserLogListItem({ temp }) {
  // isHost 들어갈 정보 달라짐
  const tempId = 'jiae';
  const infoId = { seed: 5000000, buy: 100000, eval: 10000000 };
  const profilePath = `profile_pics/${temp.profile}`;
  return (
    <UserLogItemContainer temp={temp} tempId={tempId}>
      <LeftSection>
        <UserBox>
          <Avatar className="border-2 border-black" size="" variant="circular" src={profilePath} />
          <div>{temp.nickname}</div>
        </UserBox>
        {temp.nickname === tempId && (
          <ReadyBtn type="submit" className="w-[100%]">
            ready
          </ReadyBtn>
        )}
      </LeftSection>
      <RightSection>
        <div className="mb-0">총 평가 자산 : {temp.total}</div>
        <div>평가손익 : {temp.profit}%</div>
        {temp.nickname === tempId && (
          <MyBox>
            <div>예수금 {infoId.seed}</div>
            <div>총매입금액 {infoId.buy}</div>
            <div>총평가금액 {infoId.eval}</div>
          </MyBox>
        )}
      </RightSection>
    </UserLogItemContainer>
  );
}

const UserLogItemContainer = styled.div`
  ${tw`border-2 bg-white rounded-xl flex p-5 gap-5`}
  ${(props) => (props.tempId === props.temp.nickname ? tw`h-[40%]` : tw`h-[20%]`)}
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
  ${tw`border-2 rounded-lg text-center bg-primary`};
`;

const MyBox = styled.div`
  ${tw`flex justify-center items-center gap-2 text-xs text-center`};
`;
