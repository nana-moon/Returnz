import React from 'react';
import tw, { styled } from 'twin.macro';

export default function FriendListItems() {
  return (
    <FriendInfoContainer>
      <FriendPicItem>친구프사</FriendPicItem>
      <FriendNameItem>친구이름</FriendNameItem>
      <ContentText>친구...뭐시기</ContentText>
    </FriendInfoContainer>
  );
}

const FriendInfoContainer = styled.div`
  ${tw`bg-white border-2 border-negative rounded-lg py-1 px-2 my-2 flex`}
`;

const FriendPicItem = styled.div`
  ${tw`text-2xl`}
`;

const FriendNameItem = styled.div`
  ${tw`text-lg`}
`;

const ContentText = styled.div`
  ${tw`text-sm`}
`;
