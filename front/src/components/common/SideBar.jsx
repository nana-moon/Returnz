/* eslint-disable no-empty */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import SockJs from 'sockjs-client';
import StompJs from 'stompjs';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Card, CardHeader, Input, Avatar, Button } from '@material-tailwind/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { friendRequest } from '../../apis/friend';

export default function SideBar({ onModal }) {
  const [friendNickname, setfriendNickname] = useState('');
  const onChange = (e) => setfriendNickname(e.target.value);
  const openModal = () => {
    onModal(true);
  };
  const handleFriendRequest = async () => {
    const result = await friendRequest(friendNickname);
    console.log(result);
  };

  const sock = new SockJs('http://192.168.100.175:8080/ws');
  // client 객체 생성 및 서버주소 입력
  const stomp = StompJs.over(sock);
  // stomp로 감싸기
  const me = Cookies.get('access_token');
  const stompConnect = () => {
    try {
      stomp.debug = null;
      // console에 보여주는데 그것을 감추기 위한 debug
      console.log('111');
      stomp.connect(
        {
          // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
          Authorization: `Bearer ${me}`,
        },
        () => {
          stomp.subscribe(
            `/user/sub/side-bar`,
            (data) => {
              const newMessage = JSON.parse(data.body);
              console.log(newMessage);
              // 데이터 파싱
            },
            {
              // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
              Authorization: `Bearer ${me}`,
            },
          );
          stomp.send(
            '/pub/side-bar',
            {
              // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
              Authorization: `Bearer ${me}`,
            },
            JSON.stringify({
              type: 'FRIEND',
              messageBody: {
                requestUsername: 'giokim12@naver.com',
                targetUsername: 'moon@naver.com',
              },
            }),
          );
        },
      );
    } catch (err) {
      console.log(err);
    }
  };
  stompConnect();

  // const stompDisConnect = () => {
  //   console.log('222');
  //   try {
  //     stomp.debug = null;
  //     stomp.disconnect(
  //       () => {
  //         stomp.unsubscribe('sub-0');
  //       },
  //       {
  //         // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
  //         Authorization:
  //           'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb29uQG5hdmVyLmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJ1c2VybmFtZSI6Im1vb25AbmF2ZXIuY29tIiwiaWQiOjgsIm5pY2tuYW1lIjoibW9vbiIsInByb2ZpbGVJY29uIjoiQSIsImV4cCI6MTY3OTc5NDMyMH0.CN8mcVj8BSqW49qHnwcbjMi8jZ8EMPBEvoIXxWai0M4',
  //       },
  //     );
  //   } catch (err) {}
  // };
  // const sendMessage = () => {
  //   stomp.send(
  //     '/pub/side-bar',
  //     JSON.stringify({
  //       type: 'FRINED',
  //       messageBody: {
  //         requestUsername: 'moon@naver.com',
  //         targetUsername: 'ssafy6@naver.com',
  //       },
  //     }),
  //     {
  //       // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
  //       Authorization:
  //         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb29uQG5hdmVyLmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJ1c2VybmFtZSI6Im1vb25AbmF2ZXIuY29tIiwiaWQiOjgsIm5pY2tuYW1lIjoibW9vbiIsInByb2ZpbGVJY29uIjoiQSIsImV4cCI6MTY3OTgxNTQwNn0.fKPM4dJ45QhnUkAy9eOh2nNnsDbyef8RXT5zkthArhM',
  //     },
  //   );
  // };
  // sendMessage();

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
