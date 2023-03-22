import React, { useEffect, useState } from 'react';
// import SockJs from 'sockjs-client';
// import StompJs from 'stompjs';
// import { io } from 'socket.io-client';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Card, CardHeader, Input, Avatar } from '@material-tailwind/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { friendRequest } from '../../apis/friend';

export default function SideBar({ onModal }) {
  // const socket = new io('http://서버주소');
  // const stomp = StompJs.over(sock);
  const [friendNickname, setfriendNickname] = useState('');
  const onChange = (e) => setfriendNickname(e.target.value);
  const openModal = () => {
    onModal(true);
  };
  const handleFriendRequest = async () => {
    const result = await friendRequest(friendNickname);
    console.log(result);
  };
  // const stompConnect = () => {
  //   try {
  //     stomp.debug = null;
  //     //웹소켓 연결시 stomp에서 자동으로 connect이 되었다는것을
  //     //console에 보여주는데 그것을 감추기 위한 debug

  //     stomp.connect(token, () => {
  //       stomp.subscribe(
  //         `서버주소`,
  //         (data) => {
  //           const newMessage = JSON.parse(data.body);
  //           //데이터 파싱
  //         },
  //         token,
  //       );
  //     });
  //   } catch (err) {}
  // };
  // message event listener
  // useEffect(() => {
  //   const messageHandler = (chat: IChat) =>
  //     setChats((prevChats) => [...prevChats, chat]);

  //   socket.on('message', messageHandler);

  //   return () => {
  //     socket.off('message', messageHandler);
  //   };
  // }, []);
  return (
    <SideBarContainer>
      <MyProfileCard>
        <Card color="transparent" shadow={false} className="w-full">
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-2 flex items-center gap-4 pt-0 pb-4"
          >
            <Avatar size="lg" variant="circular" src="../../profile_pics/green.jpg" />
            <MyInfoBox>
              <UsernameContent>내 유저네임</UsernameContent>
              <ProfileChangeButton onClick={openModal}>프로필 수정하러 가기</ProfileChangeButton>
              {/* {modal === true ? <ProfileEditModal /> : null} */}
            </MyInfoBox>
          </CardHeader>
        </Card>
      </MyProfileCard>
      <FriendSearchContainer>
        <Input
          type="text"
          label="닉네임을 검색하세요"
          color="cyan"
          value={friendNickname}
          onChange={onChange}
          className="bg-input"
        />
        <SearchButton onClick={handleFriendRequest}>
          <AiOutlineSearch />
        </SearchButton>
      </FriendSearchContainer>
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  ${tw`bg-white border-l-2 border-negative w-1/5`}
`;

const MyProfileCard = styled.div`
  ${tw`border-b-2 border-negative`}
`;

const FriendSearchContainer = styled.div`
  ${tw`flex border-t-2 border-negative px-2 pt-2 gap-2`}
`;

const SearchButton = styled.button`
  ${tw`text-primary bg-white border-2 border-primary hover:bg-cyan-100 focus:border-dprimary font-bold font-spoq text-sm rounded-lg px-2 py-1 text-center`}
`;

const MyInfoBox = styled.div`
  ${tw`font-spoq`}
`;

const UsernameContent = styled.div`
  ${tw`text-lg py-1 font-bold`}
`;

const ProfileChangeButton = styled.button`
  /* 
  z-index: 0;
  */
  ${tw`text-primary bg-white border-2 border-primary hover:bg-cyan-100 focus:border-dprimary font-bold font-spoq text-sm rounded-lg px-2 py-1 text-center`}
`;
