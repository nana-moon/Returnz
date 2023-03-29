import React from 'react';
import tw, { styled } from 'twin.macro';
import { Avatar } from '@material-tailwind/react';

export default function FriendListItems({ friend }) {
  // const picPath = `profile_pics/${myPic}.jpg`;
  return (
    <FriendInfoContainer>
      <Avatar variant="circular" src={`profile_pics/${friend.profileIcon}.jpg`} />
      <FriendNameItem>{friend.nickname}</FriendNameItem>
      <ContentText>{friend.state}</ContentText>
    </FriendInfoContainer>
  );
}

const FriendInfoContainer = styled.div`
  ${tw`bg-white border-2 border-negative rounded-lg py-1 px-2 my-2 flex`}
`;

const FriendNameItem = styled.div`
  ${tw`text-lg`}
`;

const ContentText = styled.div`
  ${tw`text-sm`}
`;
