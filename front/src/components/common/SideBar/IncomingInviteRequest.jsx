import { Avatar } from '@material-tailwind/react';
import { React } from 'react';
import tw, { styled } from 'twin.macro';
import { acceptInviteRequestApi, declineInviteRequestApi } from '../../../apis/friendApi';

export default function IncomingInviteRequest({ friendInv }) {
  const acceptRequest = () => {
    acceptInviteRequestApi();
  };
  const declineRequest = () => {
    declineInviteRequestApi();
  };
  return (
    <RequestContainer>
      <Avatar
        size="md"
        variant="circular"
        src={`profile_pics/${friendInv.profileIcon}.jpg`}
        className="my-auto border-2 border-negative "
      />
      <RequestBox>
        <RequestNickname>{friendInv.nickname}</RequestNickname>
        <ButtonsContainer>
          <AcceptButton onClick={acceptRequest}>수락</AcceptButton>
          <DeclineButton onClick={declineRequest}>거절</DeclineButton>
        </ButtonsContainer>
      </RequestBox>
    </RequestContainer>
  );
}

const RequestContainer = styled.div`
  ${tw`flex py-2 pl-2 `}
`;

const RequestBox = styled.div`
  ${tw`w-[100%]`}
`;

const RequestNickname = styled.div`
  ${tw`text-lg my-auto ml-3`}
`;

const ButtonsContainer = styled.div`
  ${tw`flex ml-5 gap-4 mt-1`}
`;

const AcceptButton = styled.button`
  ${tw`text-white bg-primary hover:bg-dprimary focus:ring-4 focus:outline-none focus:ring-cyan-100 font-bold rounded-lg px-2 py-1 text-center my-auto`}
`;

const DeclineButton = styled.button`
  ${tw`text-white bg-negative hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-100 font-bold rounded-lg px-2 py-1 text-center my-auto`}
`;
