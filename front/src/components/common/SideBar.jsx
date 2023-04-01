/* eslint-disable no-empty */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import SockJs from 'sockjs-client';
import StompJs from 'stompjs';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import tw from 'twin.macro';
import Stomp from 'webstomp-client';
import { useQuery } from 'react-query';
import { Input } from '@material-tailwind/react';
import { AiOutlineSearch } from 'react-icons/ai';
import FriendListItems from './Items/FriendListItems';
import UserProfile from './SideBar/UserProfile';
// import FriendSearchInput from './SideBar/FriendSearchInput';
import IncomingFriendRequests from './SideBar/IncomingFriendRequests';
import { getFriendRequestsApi } from '../../apis/friendApi';

// import { stomp } from '../../apis/axiosConfig';

export default function SideBar() {
  // 내정보
  const myToken = Cookies.get('access_token');
  const myMail = Cookies.get('email');
  // 내 친구
  const [friendList, setfriendList] = useState();
  // 내가 친구 추가하고싶은 사람
  const [newFriendNickname, setNewFriendNickname] = useState('');
  const onChange = (e) => setNewFriendNickname(e.target.value);
  const [buttonState, setButtonState] = useState(false);
  const sendFriendRq = () => {
    setButtonState(true);
    if (buttonState) {
      handleFriendRequest();
    }
  };
  // 웹소켓
  // const sock = new SockJs('http://j8c106.p.ssafy.io:8188/ws');
  const sock = new SockJs('http://192.168.100.175:8080/ws');

  const options = {
    debug: false,
    protocols: Stomp.VERSIONS.supportedProtocols(),
  };
  // client 객체 생성 및 서버주소 입력
  const stomp = StompJs.over(sock, options);
  // stomp로 감싸기
  // const { data: friendList } = useQuery({
  //   queryKey: ['friendRequests'],
  //   queryFn: () => getFriendRequests(),
  //   onError: (e) => {
  //     console.log(e);
  //   },
  //   staleTime: 1000000,
  // });
  // 구독하기
  const handleSubscribe = () => {
    try {
      stomp.subscribe(
        `/user/sub/side-bar`,
        (data) => {
          const newMessage = JSON.parse(data.body);
          if (newMessage.type === 'ENTER') {
            console.log(newMessage, '내 친구 누구냐');
            const newFriend = newMessage.messageBody.friendList;
            console.log(newFriend, '나의 칭구칭긔');
            setfriendList(newFriend);
          } else if (newMessage.type === 'STATE') {
            console.log(newMessage, '누가 상태바꿨냐');
          } else if (newMessage.type === 'FRIEND') {
            console.log(newMessage, '친구요청 잘왓니');
          } else if (newMessage.type === 'INVITE') {
            console.log(newMessage, '야 빨리 게임 들어오래');
          }
          console.log('ㅎㅎ');
        },
        {
          // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
          Authorization: `${myToken}`,
        },
      );
    } catch (err) {
      console.log(err, '에러');
    }
  };

  const handleEnter = () => {
    try {
      stomp.send(
        '/pub/side-bar',
        {
          // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
          Authorization: `${myToken}`,
        },
        JSON.stringify({
          type: 'ENTER',
          messageBody: {
            username: `${myMail}`,
          },
        }),
      );
      // stompUnsub();

      // stomp.send(
      //   '/pub/side-bar',
      //   {
      //     // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
      //     Authorization: `${myToken}`,
      //   },
      //   JSON.stringify({
      //     type: 'FRIEND',
      //     messageBody: {
      //       username: `${myMail}`,
      //     },
      //   }),
      // );
    } catch (err) {
      console.log(err, '에러');
    }
  };

  const handleFriendRequest = () => {
    // handleSubscribe();
    console.log('함수 들어옴');
    try {
      stomp.send(
        '/pub/side-bar',
        {
          // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
          Authorization: `${myToken}`,
        },
        JSON.stringify({
          type: 'FRIEND',
          messageBody: {
            username: `${myMail}`,
          },
        }),
      );
    } catch (err) {
      console.log(err, '에러');
    }
  };

  function stompGetAlarms() {
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
          handleSubscribe();
          handleEnter();
          buttonState && handleFriendRequest();
          // handleSubscribe();
          // handleFriendRequest();
        },
      );
    } catch (err) {
      console.log(err, '에러');
    }
  }

  useEffect(() => {
    stompGetAlarms();
  }, [buttonState]);

  const stompUnsub = () => {
    stomp.unsubscribe('sub-0');
  };
  // const { data: friendlist } = useQuery('friendlist', async () => {
  //   const response = await stompConnect();
  //   console.log(response, '리액트쿼리');
  //   return response;
  // });

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
  //         Authorization: `${myToken}`,
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
  const { data: friendRequests } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: () => getFriendRequestsApi(),
    onError: (e) => {
      console.log(e, '에러');
    },
    // staleTime: 1000000,
  });
  return (
    <SideBarContainer>
      <UserProfile />
      <FriendRequestsContainer>
        {friendRequests?.length > 0 ? <SectionTitle>친구요청</SectionTitle> : null}
        {friendRequests?.map((friendReq) => {
          return <IncomingFriendRequests friendReq={friendReq} key={friendReq.requestId} />;
        })}
      </FriendRequestsContainer>
      <FriendListContainer>
        {friendList?.length > 0 ? <SectionTitle>내 친구들</SectionTitle> : null}
        {friendList?.map((friend) => {
          return <FriendListItems friend={friend} key={friend.username} />;
        })}
      </FriendListContainer>
      <FriendSearchContainer>
        <Input
          type="text"
          label="닉네임을 검색하세요"
          color="cyan"
          value={newFriendNickname}
          onChange={onChange}
          className="bg-input"
        />
        <SearchButton onClick={sendFriendRq}>
          <AiOutlineSearch />
        </SearchButton>
      </FriendSearchContainer>
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  position: relative;
  ${tw`bg-white border-l-2 border-negative w-1/5`}
`;

const FriendRequestsContainer = styled.div`
  ${tw`border-b-2`}
`;
const SectionTitle = styled.div`
  ${tw`bg-dprimary text-white pl-4 font-bold `}
`;
const FriendListContainer = styled.div`
  ${tw``}
`;
const FriendSearchContainer = styled.div`
  position: fixed;
  bottom: 0px;
  ${tw`flex border-t-2 border-negative p-2 gap-2 bg-white`}
`;

const SearchButton = styled.button`
  ${tw`text-primary bg-white border-2 border-primary hover:bg-cyan-100 focus:border-dprimary font-bold font-spoq text-sm rounded-lg px-2 py-1 text-center`}
`;
