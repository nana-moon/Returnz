import React from 'react';
import tw, { styled } from 'twin.macro';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { makeRoomApi } from '../../apis/gameApi';

export default function TopButtons() {
  const navigate = useNavigate();

  // 대기방 만들고 방정보 전달하기
  const handleMakeRoom = async () => {
    const waitRoomInfo = await makeRoomApi();
    Swal.fire({
      title: `성공적으로 방을 생성하였습니다.`,
      timer: 1000,
      showConfirmButton: false,
    });
    navigate('/waiting', { state: waitRoomInfo });
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
