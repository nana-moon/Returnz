import React, { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { Avatar } from '@material-tailwind/react';
import Cookies from 'js-cookie';

export default function UnlockResult({ result }) {
  // 나 확인하기
  const myNickname = Cookies.get('nickname');
  const myResult = result?.filter((res) => {
    return res.nickname === myNickname;
  });

  return (
    <UnlockContainer>
      <div className="w-full border-b-2 pb-2 font-bold text-center text-xl mb-4">해금된 프로필 이미지</div>
      {myResult[0]?.newProfiles?.map((newProfile) => {
        const picPath = `profile_pics/${newProfile}.jpg`;
        return (
          <Avatar key={newProfile} size="xl" variant="circular" src={picPath} className="border-2 border-negative" />
        );
      })}
    </UnlockContainer>
  );
}

const UnlockContainer = styled.div`
  ${tw`border bg-white p-2 rounded-xl h-[80%] font-spoq`}
`;
