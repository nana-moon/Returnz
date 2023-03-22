import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';

export default function ProfileEditModal({ onModal }) {
  // const [modal, setModalClose] = useState(false);
  const closeModal = () => {
    onModal(false);
  };
  return (
    <ProfileEditContainer>
      <ProfileEditModalContainer>gg</ProfileEditModalContainer>
      <ModalSection>
        <UserNameContainer>내 유저네임</UserNameContainer>
        <PicturesContainer>
          더 열심히 해서 해금 해봐용ㅇㅇ용
          <PictureItemBox>사진1</PictureItemBox>
        </PicturesContainer>
        <ButtonsSection>
          <CompleteButton>저장하기</CompleteButton>
          <BackButton onClick={closeModal}>나가기</BackButton>
        </ButtonsSection>
      </ModalSection>
    </ProfileEditContainer>
  );
}

const ProfileEditContainer = styled.div`
  ${tw`font-spoq relative w-[100%]`}
`;

const ProfileEditModalContainer = styled.div`
  position: fixed;
  z-index: 1;
  ${tw`bg-black opacity-20 font-spoq h-screen w-[100%]`}
`;

const ModalSection = styled.div`
  position: fixed;
  top: 10%;
  left: 30%;
  z-index: 2;
  ${tw`bg-white h-[75%] w-[50%] justify-items-center rounded-xl border-2 border-negative grid grid-rows-5`}
`;

const UserNameContainer = styled.div`
  ${tw`text-xl`}
`;

const PicturesContainer = styled.div`
  ${tw`bg-yellow-500 row-span-3 grid grid-cols-4`}
`;
const PictureItemBox = styled.div`
  ${tw`bg-blue-500 row-span-3`}
`;

const ButtonsSection = styled.div`
  ${tw`flex justify-between mx-10`}
`;
const CompleteButton = styled.div`
  ${tw`bg-blue-200`}
`;
const BackButton = styled.button`
  ${tw`bg-blue-200`}
`;
