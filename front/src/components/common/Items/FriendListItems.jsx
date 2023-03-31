import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { Avatar } from '@material-tailwind/react';

export default function FriendListItems({ friend }) {
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

  return (
    <FriendInfoContainer>
      <Avatar variant="circular" src={`profile_pics/${friend.profileIcon}.jpg`} className="border-2 border-negative" />
      <FriendStateCircle className={friendColor} />
      <FriendInfoSection>
        <FriendNameItem>{friend.nickname}</FriendNameItem>
        {/* <FriendNameItem>열글자닉네임은어떨까</FriendNameItem> */}
        <FriendStateItem className={friendStateColor}>{friend.state}</FriendStateItem>
      </FriendInfoSection>
    </FriendInfoContainer>
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
  ${tw`text-lg mt-1`}
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
