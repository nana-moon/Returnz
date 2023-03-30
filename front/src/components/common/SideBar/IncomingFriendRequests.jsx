import { Avatar } from '@material-tailwind/react';
import { React } from 'react';
import tw, { styled } from 'twin.macro';
import { acceptFriendRequestApi, declineFriendRequestApi } from '../../../apis/friendApi';

export default function IncomingFriendRequests({ friendReq }) {
  const acceptRequest = () => {
    acceptFriendRequestApi(friendReq.requestId);
  };
  const declineRequest = () => {
    declineFriendRequestApi(friendReq.requestId);
  };
  return (
    <ReceivedFriendRequestContainer>
      <RequestBox>
        <Avatar size="md" variant="circular" src={`profile_pics/${friendReq.profileIcon}.jpg`} />
        <RequestNickname>{friendReq.nickname}</RequestNickname>
        <AcceptButton onClick={acceptRequest}>수락</AcceptButton>
        <DeclineButton onClick={declineRequest}>거절</DeclineButton>
      </RequestBox>
    </ReceivedFriendRequestContainer>
  );
}

const ReceivedFriendRequestContainer = styled.div`
  ${tw``}
`;

const RequestBox = styled.div`
  ${tw`flex p-2 gap-1`}
`;

const RequestNickname = styled.div`
  ${tw`text-xl my-auto mx-3`}
`;

// const ButtonsBox = styled.div`
//   ${tw`flex gap-2`}
// `;

const AcceptButton = styled.div`
  ${tw`text-white bg-primary hover:bg-dprimary focus:ring-4 focus:outline-none focus:ring-cyan-100 font-bold rounded-lg px-2 py-1 text-center my-auto`}
`;

const DeclineButton = styled.div`
  ${tw`text-white bg-negative hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-100 font-bold rounded-lg px-2 py-1 text-center my-auto`}
`;
