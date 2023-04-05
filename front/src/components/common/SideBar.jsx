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
import IncomingInviteRequest from './SideBar/IncomingInviteRequest';
import { getFriendRequestsApi } from '../../apis/friendApi';
import { patchStateApi } from '../../apis/userApi';

export default function SideBar() {
  // 내정보
  const myToken = Cookies.get('access_token');
  const myMail = Cookies.get('email');
  // 내 친구
  const [friendList, setfriendList] = useState([]);
  const [receivedInvites, setReceivedInvites] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  // 내가 받은 친구요청 리스트
  const { data: friendRequestList } = useQuery({
    queryKey: ['friendRequestList'],
    queryFn: () => getFriendRequestsApi(),
    onError: (e) => {
      console.log(e);
    },
  });
  const [isVisible, setIsVisible] = useState(true);
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
      if (newMessage.type === 'ENTER') {
        console.log('ENTER');
        const newFriend = newMessage.messageBody.friendList;
        setfriendList(newFriend);
      }
      if (newMessage.type === 'INVITE') {
        setReceivedInvites([...receivedInvites, newMessage.messageBody]);
        console.log(newMessage.messageBody, '내가받은초대진짜진짜임');
      }
      if (newMessage.type === 'STATE') {
        console.log('STATE 메세지 도착', newMessage.messageBody);
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
      }
      if (newMessage.type === 'FRIEND') {
        console.log('FRIEND 메세지 도착', newMessage.messageBody);
        setFriendRequests([...friendRequests, newMessage.messageBody]);
      }
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
      patchStateApi();
    };
  }, []);

  // -----------------------------------[Invite]----------------------------------------------------------
  const handleInvite = (data) => {
    stompRef.current.send(pubAddress, header, data);
  };
  const handleDelete = (data) => {
    setIsVisible(data);
  };

  return (
    <SideBarContainer>
      <SideBarScrollEnabledSection>
        <UserProfile />
        <FriendRequestsContainer>
          {receivedInvites?.length > 0 && isVisible ? <SectionTitle>초대요청</SectionTitle> : null}
          {receivedInvites?.map((friendInv) => {
            return <IncomingInviteRequest friendInv={friendInv} key={friendInv.nickname} handleDelete={handleDelete} />;
          })}
        </FriendRequestsContainer>
        <FriendRequestsContainer>
          {friendRequestList?.length > 0 ? <SectionTitle>친구요청</SectionTitle> : null}
          {friendRequestList?.map((friendReq) => {
            return <IncomingFriendRequests friendReq={friendReq} key={friendReq.requestId} />;
          })}
        </FriendRequestsContainer>
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
  height: 88vh;
  ${tw`overflow-y-auto`}
`;
const FriendListContainer = styled.div`
  ${tw``}
`;
