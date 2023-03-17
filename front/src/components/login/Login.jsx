import React from 'react';
import tw, { styled } from 'twin.macro';
import { Input, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export default function Login({ changeMode }) {
  return (
    <div>
      <MainSection>로그인</MainSection>
      <EmailInput color="gray" label="E-mail" />
      <MarginBox />
      <Input color="gray" label="Password" />
      <MarginBox />
      <Link to="/">
        <Button variant="gradient" color="white" style={{ color: '#1CD6C9' }}>
          로그인
        </Button>
      </Link>
      <Button variant="text" color="white" onClick={changeMode}>
        회원가입
      </Button>
    </div>
  );
}

const MainSection = styled.div`
  ${tw`text-center my-12 text-5xl font-ibm text-white font-bold`}
`;

const EmailInput = styled(Input)`
  min-width: 100px;
  ${tw`border`}
`;

const MarginBox = styled.div`
  ${tw`my-8`}
`;
