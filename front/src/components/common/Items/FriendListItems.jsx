import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import Swal from 'sweetalert2';
import { Avatar } from '@material-tailwind/react';
import { getWaitRoomId } from '../../../store/roominfo/WaitRoom.selector';
import { deleteFriendApi } from '../../../apis/friendApi';

export default function FriendListItems({ friend, handleInvite }) {
  // 내정보
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
  }, [friend]);
  const deleteFriend = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '정말로 친구를 삭제하시겠습니까?',
      showCancelButton: true,
      cancelButtonText: '나가기',
      confirmButtonColor: '#FF5454',
      confirmButtonText: '네, 삭제하겠습니다.',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFriendApi(friend.username);
      }
    });
  };
  const roomId = useSelector(getWaitRoomId);
  const handleInviteRequest = () => {
    const data = JSON.stringify({
      type: 'INVITE',
      messageBody: {
        roomId: `${roomId}`,
        username: `${friend.username}`, // 초대 상대
      },
    });
    Swal.fire({
      title: `초대 성공`,
      icon: 'success',
      timer: 1000,
      showConfirmButton: false,
    });
    handleInvite(data);
  };

  return (
    <FriendInfoContainer onContextMenu={deleteFriend}>
      <Avatar variant="circular" src={`profile_pics/${friend.profileIcon}.jpg`} className="border-2 border-negative" />
      <FriendStateCircle className={friendColor} />
      <FriendInfoSection>
        <FriendNameItem>{friend.nickname}</FriendNameItem>
        <FriendStateItem className={friendStateColor}>{friend.state}</FriendStateItem>
      </FriendInfoSection>
      {currentRoute === '/waiting' ? <FriendInviteButton onClick={handleInviteRequest}>초대</FriendInviteButton> : null}
    </FriendInfoContainer>
  );
}

const FriendInfoContainer = styled.div`
  position: relative;
  ${tw`pl-2 py-2 flex`}
`;
const FriendInfoSection = styled.div`
  ${tw`ml-2`}
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
  position: absolute;
  right: 1rem;
  top: 1rem;
  ${tw`text-white bg-primary border-4 border-primary hover:bg-dprimary focus:border-dprimary font-bold text-sm rounded-lg px-3 py-1 text-center`};
`;
