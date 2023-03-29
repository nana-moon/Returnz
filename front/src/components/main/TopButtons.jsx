import React from 'react';
import { useDispatch } from 'react-redux';
import tw, { styled } from 'twin.macro';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { makeRoomApi } from '../../apis/gameApi';
import { setRoomInfo, setIsHost } from '../../store/myroominfo/MyRoomInfo.reducer';

export default function TopButtons() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 방만들기 - 방정보 받아오기
  const handleMakeRoom = async () => {
    const roomInfo = await makeRoomApi();
    await dispatch(setIsHost(true));
    await dispatch(setRoomInfo(roomInfo));
    navigate('/waiting', { state: roomInfo });
  };
  return (
    <ButtonsContainer>
      <MakeRoomButton onClick={handleMakeRoom}>게임 개설하기</MakeRoomButton>
      <StartTutorialButton to="/tutorial">튜토리얼 보기</StartTutorialButton>
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.div`
  ${tw`flex justify-center gap-20`}
`;

const MakeRoomButton = styled.button`
  ${tw`text-white bg-primary hover:bg-dprimary focus:ring-4 focus:outline-none focus:ring-cyan-100 font-bold text-3xl rounded-lg px-6 py-4 text-center`}
`;

const StartTutorialButton = styled(Link)`
  ${tw`text-primary bg-white border-4 border-primary hover:bg-cyan-100 focus:border-dprimary font-bold text-3xl rounded-lg px-6 py-3.5 text-center`}
`;
