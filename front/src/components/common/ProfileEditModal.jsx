import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Input } from '@material-tailwind/react';
import tw, { styled } from 'twin.macro';
import Cookies from 'js-cookie';
import { BsSend } from 'react-icons/bs';
import { handleModalState } from '../../store/profileeditmodal/ProfileEdit.reducer';
import { getPossibleProfile, patchMyNickname, patchMyProfile } from '../../apis/userApi';

export default function ProfileEditModal() {
  const dispatch = useDispatch();
  const onChange = (e) => setNewNickname(e.target.value);
  const [newNickname, setNewNickname] = useState('');
  const myPic = Cookies.get('profileIcon');
  const myNick = Cookies.get('nickname');
  const picPath = `profile_pics/${myPic}.jpg`;
  const [possibleProfiles, setPossibleProfiles] = useState([]);
  const allProfiles = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const profileCondition = [
    '회원가입을 하면 사용할 수 있습니다.',
    '게임을 한번 진행하면 사용할 수 있습니다.',
    '게임을 5번 진행하면 사용할 수 있습니다.',
    '게임에서 1등을 하면 사용할 수 있습니다.',
    '게임에서 꼴등을 하면 사용할 수 있습니다.',
    '한번의 게임에서 수익률이 10% 초과하면 사용할 수 있습니다.',
    '한번의 게임에서 수익률이 30% 초과하면 사용할 수 있습니다.',
    '전체 유저 중 랭킹 1위를 달성하면 획득할 수 있습니다.',
    '전체 유저 중 랭킹 3위 이내를 달성하면 획득할 수 있습니다.',
    '전체 유저 중 랭킹 10위 이내를 달성하면 획득할 수 있습니다.',
    '2연승을 달성하면 획득하실 수 있습니다.',
    '첫 친구를 추가하면 획득하실 수 있습니다.',
  ];
  const handleModal = () => {
    dispatch(handleModalState(false));
  };
  useEffect(() => {
    async function fetchData() {
      const res = await getPossibleProfile();
      setPossibleProfiles(res);
    }
    fetchData();
  }, []);
  const handleNicknameChange = async () => {
    const data = {
      newNickname: `${newNickname}`,
    };
    const res = await patchMyNickname(data);
    if (res.status === 200) {
      Cookies.remove('nickname');
      Cookies.set('nickname', newNickname);
    }
  };
  const handleProfileChange = async (pic) => {
    const data = {
      newProfile: pic,
    };
    const res = await patchMyProfile(data);
    if (res.status === 200) {
      Cookies.remove('profileIcon');
      Cookies.set('profileIcon', pic);
    }
  };
  return (
    <ProfileEditContainer>
      <BackgroundContainer>gg</BackgroundContainer>
      <ModalSection>
        <MyInfoSection>
          <Avatar size="xxl" variant="circular" src={picPath} className=" border-2 border-negative" />
        </MyInfoSection>
        <UserNameContainer>
          <Input type="text" label={myNick} color="cyan" value={newNickname} onChange={onChange} className="bg-input" />
          <SendButton onClick={handleNicknameChange}>
            <BsSend />
          </SendButton>
        </UserNameContainer>
        <EncourageMessage>총 12개의 프로필 사진을 해금해보세요</EncourageMessage>
        <PicturesContainer>
          {allProfiles?.map((pic) => {
            const isMyProfile = possibleProfiles.includes(pic);
            return (
              <div className="relative">
                <Avatar
                  key={pic}
                  size="xl"
                  variant="circular"
                  className=" border-2 border-negative"
                  src={`profile_pics/${pic}.jpg`}
                />
                <AbleClick
                  key={pic}
                  className={`${isMyProfile ? ' hover:cursor-pointer' : 'bg-black opacity-50'}`}
                  onClick={() => handleProfileChange(pic)}
                />
              </div>
            );
          })}
        </PicturesContainer>
        <ButtonsSection>
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
  z-index: 3;
  ${tw`bg-black opacity-20 font-spoq h-screen w-[100%]`}
`;

const ModalSection = styled.div`
  position: fixed;
  top: 10%;
  left: 20%;
  z-index: 4;
  ${tw`bg-white h-[75%] w-[50%] rounded-xl border-2 border-negative p-10`}
`;
const MyInfoSection = styled.div`
  ${tw`flex justify-center mb-2`}
`;
const EncourageMessage = styled.div`
  ${tw`text-center font-bold mb-4 mt-6`}
`;
const UserNameContainer = styled.div`
  ${tw`text-xl text-center flex gap-2`}
`;

const PicturesContainer = styled.div`
  ${tw`grid grid-cols-6 grid-rows-2 gap-4`}
`;

const ButtonsSection = styled.div`
  ${tw`flex justify-center gap-20 mt-10`}
`;
const BackButton = styled.button`
  ${tw`text-primary bg-white border-4 border-primary hover:bg-cyan-100 focus:border-dprimary font-bold text-xl rounded-lg px-8 py-3.5 text-center`}
`;
const SendButton = styled.button`
  ${tw`text-primary bg-white border-2 border-primary hover:bg-cyan-100 focus:border-dprimary font-bold font-spoq text-sm rounded-lg px-2 py-1 text-center`}
`;

const AbleClick = styled.div`
  position: absolute;
  z-index: 1;
  top: 1px;
  left: 1px;
  height: 72px;
  width: 72px;
  ${tw`rounded-full`}
`;

const ConditionPopover = styled.div`
  ${tw`rounded-full`}
`;
