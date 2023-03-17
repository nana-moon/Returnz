import React from 'react';
import tw, { styled } from 'twin.macro';
import { Input, Button } from '@material-tailwind/react';

export default function Signup({ changeMode }) {
  return (
    <div>
      <MainSection>회원가입</MainSection>
      <Input color="gray" label="E-mail" />
      <MarginBox />
      <Input color="gray" label="NICKNAME" />
      <MarginBox />
      <Input color="gray" label="PASSWORD" />
      <MarginBox />
      <Input color="gray" label="CONFIRM PASSWORD" />
      <MarginBox />
      <Button variant="gradient" color="white" style={{ color: '#1CD6C9' }}>
        회원가입
      </Button>
      <Button variant="text" color="white" onClick={changeMode}>
        로그인
      </Button>
    </div>
  );
}

const MainSection = styled.div`
  ${tw`text-center my-12 text-5xl font-ibm text-white font-bold`}
`;

const MarginBox = styled.div`
  ${tw`my-6`}
`;
