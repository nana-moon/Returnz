import React from 'react';
import { useDispatch } from 'react-redux';
import { Avatar } from '@material-tailwind/react';
import tw, { styled } from 'twin.macro';
import Cookies from 'js-cookie';
import { handleModalState } from '../../store/profileeditmodal/ProfileEdit.reducer';

export default function ProfileEditModal() {
  const dispatch = useDispatch();
  const myPic = Cookies.get('profileIcon');
  const myNick = Cookies.get('nickname');
  const picPath = `profile_pics/${myPic}.jpg`;
  const handleModal = () => {
    dispatch(handleModalState(false));
  };
  return (
    <ProfileEditContainer>
      <BackgroundContainer>gg</BackgroundContainer>
      <ModalSection>
        <MyInfoSection>
          <Avatar size="xxl" variant="circular" src={picPath} />
          <UserNameContainer>{myNick}</UserNameContainer>
        </MyInfoSection>
        <PicturesContainer>
          더 열심히 해서 해금 해봐용ㅇㅇ용
          <PictureItemBox>사진1</PictureItemBox>
        </PicturesContainer>
        <ButtonsSection>
          <CompleteButton>저장하기</CompleteButton>
          <BackButton onClick={handleModal}>나가기</BackButton>
        </ButtonsSection>
      </ModalSection>
    </ProfileEditContainer>
  );
}

const ProfileEditContainer = styled.div`
  ${tw`font-spoq relative w-[100%]`}
`;

const BackgroundContainer = styled.div`
  position: fixed;
  z-index: 1;
  ${tw`bg-black opacity-20 font-spoq h-screen w-[100%]`}
`;

const ModalSection = styled.div`
  position: fixed;
  top: 10%;
  left: 20%;
  z-index: 2;
  ${tw`bg-white h-[75%] w-[50%] justify-items-center rounded-xl border-2 border-negative grid grid-rows-5 p-20`}
`;

const UserNameContainer = styled.div`
  ${tw`text-xl`}
`;
const MyInfoSection = styled.div`
  ${tw`justify-center`}
`;

const PicturesContainer = styled.div`
  ${tw`row-span-3 grid grid-cols-4`}
`;
const PictureItemBox = styled.div`
  ${tw`bg-blue-500 row-span-3`}
`;

const ButtonsSection = styled.div`
  ${tw`flex justify-center gap-20`}
`;
const CompleteButton = styled.div`
  ${tw`text-white bg-primary hover:bg-dprimary focus:ring-4 focus:outline-none focus:ring-cyan-100 font-bold text-xl rounded-lg px-6 py-4 text-center`}
`;
const BackButton = styled.button`
  ${tw`text-primary bg-white border-4 border-primary hover:bg-cyan-100 focus:border-dprimary font-bold text-xl rounded-lg px-6 py-3.5 text-center`}
`;
