import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { Avatar } from '@material-tailwind/react';

export default function FriendListItems({ friend }) {
  const [friendColor, setfriendColor] = useState(false);

  useEffect(() => {
    if (friend.state === 'ONLINE') {
      setfriendColor('bg-online');
    } else if (friend.state === 'BUSY') {
      setfriendColor('bg-offline');
    } else {
      setfriendColor('bg-negative');
    }
  }, []);

  return (
    <FriendInfoContainer>
      <Avatar variant="circular" src={`profile_pics/${friend.profileIcon}.jpg`} />
      <FriendNameItem>{friend.nickname}</FriendNameItem>
      <FriendStateCircle className={friendColor} />
    </FriendInfoContainer>
  );
}

const FriendInfoContainer = styled.div`
  position: relative;
  ${tw`border-negative border-dotted border-b-2 py-3 px-2 my-2 flex`}
`;

const FriendNameItem = styled.div`
  ${tw`text-lg mx-4`}
`;

const FriendStateCircle = styled.div`
  position: absolute;
  left: 3rem;
  top: 3rem;
  ${tw`rounded-full w-4 h-4`}
`;
