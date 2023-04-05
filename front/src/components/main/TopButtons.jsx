import React from 'react';
import tw, { styled } from 'twin.macro';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeRoomApi } from '../../apis/gameApi';
import { setCaptainName, setMemberCount, setWaiterList, setWaitRoomId } from '../../store/roominfo/WaitRoom.reducer';

export default function TopButtons() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 대기방 만들고 방정보 전달하기
  const handleMakeRoom = async () => {
    const waitRoomInfo = await makeRoomApi();
    const { roomId, captainName, memberCount, waiterList } = waitRoomInfo;
    dispatch(setWaitRoomId(roomId));
    dispatch(setCaptainName(captainName));
    dispatch(setMemberCount(memberCount));
    dispatch(setWaiterList(waiterList));
    Swal.fire({
      title: `방에 입장하였습니다.`,
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
