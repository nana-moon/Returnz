/* eslint-disable no-empty */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import SockJs from 'sockjs-client';
import StompJs from 'stompjs';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import tw from 'twin.macro';
import Stomp from 'webstomp-client';
import { useQuery } from 'react-query';
import FriendListItems from './Items/FriendListItems';
import UserProfile from './SideBar/UserProfile';
import FriendSearchInput from './SideBar/FriendSearchInput';
import IncomingFriendRequests from './SideBar/IncomingFriendRequests';
import { getFriendRequestsApi } from '../../apis/friendApi';

export default function SideBar() {
  // 내정보
  const myToken = Cookies.get('access_token');
  const myMail = Cookies.get('email');
  // 내 친구
  const [friendList, setfriendList] = useState([]);
  // 내가 받은 친구요청 리스트
  const { data: friendRequests } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: () => getFriendRequestsApi(),
    onError: (e) => {
      console.log(e);
    },
  });
  // 웹소켓
  // -------------------------SOCKET MANAGER-----------------------------

  const stompRef = useRef(null);
  if (!stompRef.current) {
    const sock = new SockJs('http://j8c106.p.ssafy.io:8188/ws');
    const options = {
      debug: false,
      protocols: Stomp.VERSIONS.supportedProtocols(),
    };
    stompRef.current = StompJs.over(sock, options);
  }
  // ------웹소켓정보-------------
  const subAddress = `/user/sub/side-bar`;
  const pubAddress = '/pub/side-bar';
  const header = {
    Authorization: myToken,
  };

  // -------------------------HANDLE A RECEIVED MESSAGE-----------------------------
  const handleMessage = (data) => {
    if (stompRef.current && stompRef.current.connected) {
      const newMessage = JSON.parse(data.body);
      console.log(newMessage, '이게뭔데;');
      if (newMessage.type === 'ENTER') {
        console.log('ENTER 메세지 도착. 나의 친구칭긔', newMessage.messageBody);
        const newFriend = newMessage.messageBody.friendList;
        setfriendList(newFriend);
      }
      if (newMessage.type === 'INVITE') {
        console.log('INVITE 메세지 도착', newMessage.messageBody);
      }
      // if (newMessage.type === 'STATE') {
      //   console.log('STATE 메세지 도착', newMessage.messageBody);
      //   // setChangedFriend(newMessage.messageBody);
      //   const changedFriend = newMessage.messageBody;
      //   const updatedFriendList = friendList.map((friend) => {
      //     if (friend.username === changedFriend.friendName) {
      //       // 친구 정보가 일치하면 state 값 변경
      //       console.log(friend.username, 'd원래');
      //       console.log(changedFriend.friendName, '새로운');
      //       return { ...friend, state: changedFriend.state };
      //     }
      //     return friend;
      //   });

      //   // friendList 갱신
      //   setfriendList(updatedFriendList);
      // }
    }
  };

  // -------------------------SOCKET CONNECT-----------------------------
  useEffect(() => {
    const stompConnect = () => {
      stompRef.current.debug = null;
      stompRef.current.connect(
        header,
        () => {
          stompRef.current.subscribe(subAddress, handleMessage, header);
          stompRef.current.send(
            pubAddress,
            header,
            JSON.stringify({
              type: 'ENTER',
              messageBody: {
                username: `${myMail}`,
              },
            }),
          );
        },
        (error) => {
          console.log('WebSocket connection error:', error);
        },
      );
    };

    stompConnect();

    // Clean up when the component unmounts
    return () => {
      stompRef.current && stompRef.current.unsubscribe(subAddress);
    };
  }, []);

  // -----------------------------------[Invite]----------------------------------------------------------
  const handleInvite = (data) => {
    stompRef.current.send(pubAddress, header, data);
  };
  // ==========================================

  // useEffect(() => {
  //   const stompConnect = () => {
  //     try {
  //       stomp.debug = null;
  //       // console에 보여주는데 그것을 감추기 위한 debug
  //       console.log('Connected');
  //       stomp.connect(
  //         {
  //           // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
  //           Authorization: `${myToken}`,
  //         },
  //         () => {
  //           stomp.subscribe(
  //             `/user/sub/side-bar`,
  //             (data) => {
  //               const newMessage = JSON.parse(data.body);
  //               console.log(newMessage, '이게뭔데;');
  //               if (newMessage.type === 'ENTER') {
  //                 console.log('ENTER 메세지 도착. 나의 친구칭긔', newMessage.messageBody);
  //                 const newFriend = newMessage.messageBody.friendList;
  //                 setfriendList(newFriend);
  //               }
  //               // -------------------------handle CHAT-----------------------------
  //               if (newMessage.type === 'STATE') {
  //                 console.log('STATE 메세지 도착', newMessage.messageBody);
  //                 // setChangedFriend(newMessage.messageBody);
  //                 const changedFriend = newMessage.messageBody;
  //                 const updatedFriendList = friendList.map((friend) => {
  //                   if (friend.username === changedFriend.friendName) {
  //                     // 친구 정보가 일치하면 state 값 변경
  //                     console.log(friend.username, 'd원래');
  //                     console.log(changedFriend.friendName, '새로운');
  //                     return { ...friend, state: changedFriend.state };
  //                   }
  //                   return friend;
  //                 });

  //                 // friendList 갱신
  //                 setfriendList(updatedFriendList);
  //               }
  //               // -------------------------handle GAME_INFO-----------------------------
  //               if (newMessage.type === 'INVITE') {
  //                 console.log('INVITE 메세지 도착', newMessage.messageBody);
  //               }

  //               // 데이터 파싱
  //             },
  //             {
  //               // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
  //               Authorization: `${myToken}`,
  //             },
  //           );
  //           stomp.send(
  //             '/pub/side-bar',
  //             {
  //               // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
  //               Authorization: `${myToken}`,
  //             },
  //             JSON.stringify({
  //               type: 'ENTER',
  //               messageBody: {
  //                 username: `${myMail}`,
  //               },
  //             }),
  //           );
  //         },
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   stompConnect();
  // }, []);

  return (
    <SideBarContainer>
      <SideBarScrollEnabledSection>
        <UserProfile />
        {/* <FriendRequestsContainer>
          {friendInvites?.length > 0 ? <SectionTitle>초대요청</SectionTitle> : null}
          {friendInvites?.map((friendInv) => {
            return <IncomingFriendRequests friendReq={friendInv} key={friendInv.requestId} />;
          })}
        </FriendRequestsContainer> */}
        <FriendRequestsContainer>
          {friendRequests?.length > 0 ? <SectionTitle>친구요청</SectionTitle> : null}
          {friendRequests?.map((friendReq) => {
            return <IncomingFriendRequests friendReq={friendReq} key={friendReq.requestId} />;
          })}
        </FriendRequestsContainer>
        <FriendListContainer>
          {friendList?.length > 0 ? <SectionTitle>내 친구들</SectionTitle> : null}
          {friendList?.map((friend) => {
            return <FriendListItems friend={friend} key={friend.username} handleInvite={handleInvite} />;
          })}
        </FriendListContainer>
      </SideBarScrollEnabledSection>
      <FriendSearchInput />
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  position: relative;
  ${tw`bg-white border-l-2 border-negative w-1/5`}
`;

const FriendRequestsContainer = styled.div`
  ${tw`border-b-2`};
`;
const SectionTitle = styled.div`
  ${tw`bg-dprimary text-white pl-4 font-bold `}
`;

const SideBarScrollEnabledSection = styled.div`
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  ${tw`overflow-y-auto h-[calc(100%-26px)]`}
`;
const FriendListContainer = styled.div`
  ${tw``}
`;
