import React, { useState, useEffect } from 'react';
import SockJs from 'sockjs-client';
import StompJs from 'stompjs';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import Stomp from 'webstomp-client';
import { Avatar } from '@material-tailwind/react';
import { getWaitRoomId } from '../../../store/roominfo/WaitRoom.selector';

export default function FriendListItems({ friend }) {
  // 내정보
  const myToken = Cookies.get('access_token');
  const [currentRoute, setCurrentRoute] = useState('');
  const location = useLocation();
  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);
  const [friendColor, setfriendColor] = useState(false);
  const [friendStateColor, setfriendStateColor] = useState(false);
  useEffect(() => {
    if (friend.state === 'ONLINE') {
      setfriendColor('bg-online');
      setfriendStateColor('text-online');
    } else if (friend.state === 'BUSY') {
      setfriendColor('bg-offline');
      setfriendStateColor('text-offline');
    } else {
      setfriendColor('bg-negative');
      setfriendStateColor('text-negative');
    }
  }, []);
  // 대기자 STATE
  const roomId = useSelector(getWaitRoomId);
  // 웹소켓
  const sock = new SockJs('http://j8c106.p.ssafy.io:8188/ws');
  const options = {
    debug: false,
    protocols: Stomp.VERSIONS.supportedProtocols(),
    reconnectDelay: 1000, // 재시도 간격 1초로 설정
    heartbeatIncoming: 4000, // 4초마다 서버로부터 heartbeat 메시지 받기
    heartbeatOutgoing: 4000, // 4초마다 서버로 heartbeat 메시지 보내기
  };
  // client 객체 생성 및 서버주소 입력
  const stomp = StompJs.over(sock, options);
  // const handleInviteRequest = () => {
  //   stomp.send(
  //     '/pub/side-bar',
  //     {
  //       // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
  //       Authorization: `${myToken}`,
  //     },
  //     JSON.stringify({
  //       type: 'FRIEND',
  //       messageBody: {
  //         roomId: `${roomId}`,
  //         username: `${friend.username}`,
  //       },
  //     }),
  //   );
  // };

  const handleInviteRequest = () => {
    try {
      stomp.debug = null;
      // console에 보여주는데 그것을 감추기 위한 debug
      console.log('Connected');
      stomp.connect(
        {
          // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
          Authorization: `${myToken}`,
        },
        () => {
          console.log('하하랗라하라');
          stomp.subscribe(
            `/user/sub/side-bar`,
            (data) => {
              const newMessage = JSON.parse(data.body);
              console.log(newMessage, '이게뭔데;');
              if (newMessage.type === 'ENTER') {
                console.log('ENTER 메세지 도착. 나의 친구칭긔', newMessage.messageBody);
                const newFriend = newMessage.messageBody.friendList;
                console.log(newFriend, '나의 칭구칭긔');
                // setfriendList(newFriend);
              }
              // -------------------------handle CHAT-----------------------------
              if (newMessage.type === 'STATE') {
                console.log('STATE 메세지 도착', newMessage.messageBody);
              }
              // -------------------------handle SETTING-----------------------------
              if (newMessage.type === 'FRIEND') {
                console.log('FRIEND 메세지 도착', newMessage.messageBody);
              }
              // -------------------------handle GAME_INFO-----------------------------
              if (newMessage.type === 'INVITE') {
                console.log('INVITE 메세지 도착', newMessage.messageBody);
              }

              // 데이터 파싱
            },
            {
              // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
              Authorization: `${myToken}`,
            },
          );
          stomp.send(
            '/pub/side-bar',
            {
              // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
              Authorization: `${myToken}`,
            },
            JSON.stringify({
              type: 'FRIEND',
              messageBody: {
                roomId: `${roomId}`,
                username: `${friend.username}`,
              },
            }),
          );
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <FriendInfoContainer>
        <Avatar
          variant="circular"
          src={`profile_pics/${friend.profileIcon}.jpg`}
          className="border-2 border-negative"
        />
        <FriendStateCircle className={friendColor} />
        <FriendInfoSection>
          <FriendNameItem>{friend.nickname}</FriendNameItem>
          {/* <FriendNameItem>이름이열글자인사람이</FriendNameItem> */}
          <FriendStateItem className={friendStateColor}>{friend.state}</FriendStateItem>
        </FriendInfoSection>
      </FriendInfoContainer>
      {currentRoute === '/waiting' ? (
        <FriendInviteButton onClick={handleInviteRequest}>게임 초대하기</FriendInviteButton>
      ) : null}
    </>
  );
}

const FriendInfoContainer = styled.div`
  position: relative;
  ${tw`px-2 py-2 flex`}
`;
const FriendInfoSection = styled.div`
  ${tw`ml-3`}
`;
const FriendNameItem = styled.div`
  ${tw`mt-1`}
`;
const FriendStateItem = styled.div`
  position: absolute;
  left: 3.6rem;
  top: 2.6rem;
  ${tw`text-xs font-bold ml-2`}
`;

const FriendStateCircle = styled.div`
  position: absolute;
  left: 2.8rem;
  top: 2.6rem;
  ${tw`rounded-full w-4 h-4`}
`;

const FriendInviteButton = styled.button`
  ${tw`text-white bg-primary border-4 border-primary hover:bg-dprimary focus:border-dprimary font-bold text-sm rounded-lg px-3 py-1 text-center mx-10`};
`;
