import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import { Card, CardHeader, Avatar } from '@material-tailwind/react';
import Cookies from 'js-cookie';
import { handleModalState } from '../../../store/profileeditmodal/ProfileEdit.reducer';

export default function UserProfile() {
  const dispatch = useDispatch();
  const myPic = Cookies.get('profileIcon');
  const myNick = Cookies.get('nickname');
  const picPath = `profile_pics/${myPic}.jpg`;
  const handleModal = () => {
    dispatch(handleModalState(true));
  };
  return (
    <MyProfileCard>
      <Card color="transparent" shadow={false} className="w-full">
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-2 flex items-center gap-3 pt-0 pb-4"
        >
          <Avatar size="xl" variant="circular" src={picPath} className="border-2 border-negative" />
          <MyInfoBox>
            <UsernameContent>{myNick}</UsernameContent>
            <ProfileChangeButton onClick={handleModal}>프로필 수정하러 가기</ProfileChangeButton>
          </MyInfoBox>
        </CardHeader>
      </Card>
    </MyProfileCard>
  );
}

const MyProfileCard = styled.div`
  ${tw`border-b-2 border-negative`}
`;

const MyInfoBox = styled.div`
  ${tw`font-spoq`}
`;

const UsernameContent = styled.div`
  ${tw`py-1 font-bold`}
`;

const ProfileChangeButton = styled.button`
  /*
  z-index: 0;
  */
  ${tw`text-primary bg-white border-2 border-primary hover:bg-cyan-100 focus:border-dprimary font-bold font-spoq text-sm rounded-lg px-2 py-1 text-center`}
`;
