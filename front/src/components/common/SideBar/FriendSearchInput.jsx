import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import SockJs from 'sockjs-client';
import StompJs from 'stompjs';
import Cookies from 'js-cookie';
import Stomp from 'webstomp-client';

import { AiOutlineSearch } from 'react-icons/ai';

export default function FriendSearchInput() {
  const onChange = (e) => setfriendNickname(e.target.value);
  const [friendNickname, setfriendNickname] = useState('');
  const sock = new SockJs('http://j8c106.p.ssafy.io:8188/ws');
  const options = {
    debug: false,
    protocols: Stomp.VERSIONS.supportedProtocols(),
  };
  // client 객체 생성 및 서버주소 입력
  const stomp = StompJs.over(sock, options);
  const myToken = Cookies.get('access_token');
  const handleFriendRequest = () => {
    //   const result = () => {
    //     stomp.subscribe(
    //       `/user/sub/side-bar`,
    //       (data) => {
    //         const newMessage = JSON.parse(data.body);
    //         console.log()
    //         // 데이터 파싱
    //       },
    //       {
    //         // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
    //         Authorization: `${myToken}`,
    //       },
    //     );
    //     stomp.send(
    //       '/pub/side-bar',
    //       {
    //         // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음
    //         Authorization: `${myToken}`,
    //       },
    //       JSON.stringify({
    //         type: 'ENTER',
    //         messageBody: {
    //           username: `${myMail}`,
    //         },
    //       }),
    //     );
    //   };
    //   console.log(result);
  };
  return (
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
  );
}

const FriendSearchContainer = styled.div`
  // position: fixed;
  ${tw`flex border-t-2 border-negative px-2 pt-2 gap-2`}
`;

const SearchButton = styled.button`
  ${tw`text-primary bg-white border-2 border-primary hover:bg-cyan-100 focus:border-dprimary font-bold font-spoq text-sm rounded-lg px-2 py-1 text-center`}
`;
