import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Input } from '@material-tailwind/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { sendFriendRequestApi } from '../../../apis/friendApi';

export default function FriendSearchInput() {
  const onChange = (e) => setfriendNickname(e.target.value);
  const [friendNickname, setfriendNickname] = useState('');
  const handleFriendRequest = () => {
    const data = {
      type: 'FRIEND',
      messageBody: {
        nickname: `${friendNickname}`,
      },
    };
    sendFriendRequestApi(data);
  };
  return (
    <FriendSearchContainer>
      <Input
        type="text"
        label="친구 닉네임을 검색하세요"
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
  position: fixed;
  bottom: 0px;
  ${tw`flex border-t-2 border-negative p-2 gap-2 bg-white`}
`;

const SearchButton = styled.button`
  ${tw`text-primary bg-white border-2 border-primary hover:bg-cyan-100 focus:border-dprimary font-bold font-spoq text-sm rounded-lg px-2 py-1 text-center`}
`;
