import React, { useState, useEffect, useRef } from 'react';
import SockJs from 'sockjs-client';
import StompJs from 'stompjs';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import Stomp from 'webstomp-client';
import { Avatar } from '@material-tailwind/react';
import { getWaitRoomId } from '../../../store/roominfo/WaitRoom.selector';

export default function FriendListItems({ friend, handleInvite }) {
  // 내정보
  const myToken = Cookies.get('access_token');
  const [currentRoute, setCurrentRoute] = useState('');
  const location = useLocation();
  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);
  const [friendColor, setfriendColor] = useState(false);
  const [friendStateColor, setfriendStateColor] = useState(false);
  useEffect(() => {
    if (friend.state === 'ONLINE') {
      setfriendColor('bg-online');
      setfriendStateColor('text-online');
    } else if (friend.state === 'BUSY') {
      setfriendColor('bg-offline');
      setfriendStateColor('text-offline');
    } else {
      setfriendColor('bg-negative');
      setfriendStateColor('text-negative');
    }
  }, []);

  const roomId = useSelector(getWaitRoomId);
  const handleInviteRequest = () => {
    const data = JSON.stringify({
      type: 'INVITE',
      messageBody: {
        roomId: `${roomId}`,
        username: `${friend.username}`, // 초대 상대
      },
    });
    handleInvite(data);
  };

  return (
    <>
      <FriendInfoContainer>
        <Avatar
          variant="circular"
          src={`profile_pics/${friend.profileIcon}.jpg`}
          className="border-2 border-negative"
        />
        <FriendStateCircle className={friendColor} />
        <FriendInfoSection>
          <FriendNameItem>{friend.nickname}</FriendNameItem>
          {/* <FriendNameItem>이름이열글자인사람이</FriendNameItem> */}
          <FriendStateItem className={friendStateColor}>{friend.state}</FriendStateItem>
        </FriendInfoSection>
      </FriendInfoContainer>
      {currentRoute === '/waiting' ? (
        <FriendInviteButton onClick={handleInviteRequest}>게임 초대하기</FriendInviteButton>
      ) : null}
    </>
  );
}

const FriendInfoContainer = styled.div`
  position: relative;
  ${tw`px-2 py-2 flex`}
`;
const FriendInfoSection = styled.div`
  ${tw`ml-3`}
`;
const FriendNameItem = styled.div`
  ${tw`mt-1`}
`;
const FriendStateItem = styled.div`
  position: absolute;
  left: 3.6rem;
  top: 2.6rem;
  ${tw`text-xs font-bold ml-2`}
`;

const FriendStateCircle = styled.div`
  position: absolute;
  left: 2.8rem;
  top: 2.6rem;
  ${tw`rounded-full w-4 h-4`}
`;

const FriendInviteButton = styled.button`
  ${tw`text-white bg-primary border-4 border-primary hover:bg-dprimary focus:border-dprimary font-bold text-sm rounded-lg px-3 py-1 text-center mx-10`};
`;
