import { React, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Input, Button } from '@material-tailwind/react';

export default function Login({ changeMode }) {
  const [EmailCheck, setEmailCheck] = useState(true);
  const [userLoginData, setUserLoginData] = useState({
    email: false,
    password: false,
  });

  const handleCheckEmail = (e) => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      console.log('이메일 유효성검사 성공', e.target.value);
      setEmailCheck(true);
      const copy = { ...userLoginData };
      copy.email = e.target.value;
      setUserLoginData(copy);
    } else {
      console.log('이메일 유효성검사 실패', e.target.value);
      setEmailCheck(false);
      const copy = { ...userLoginData };
      copy.email = false;
      setUserLoginData(copy);
    }
  };
  const handleCheckPassword = (e) => {
    const copy = { ...userLoginData };
    copy.password = e.target.value;
    setUserLoginData(copy);
  };

  const handleLoginRequest = () => {
    console.log(userLoginData, '여기서 이 데이터 보낼거임');
  };
  return (
    <Contanier>
      <MainSection>로그인</MainSection>
      <InputBox>
        <EmailInput color="blue-gray" size="lg" label="이메일" onBlur={handleCheckEmail} error={!EmailCheck} />
        {EmailCheck ? <MarginBox /> : <ErrorMsg>이메일 형식이 올바르지 않습니다.</ErrorMsg>}
        <Input type="password" size="lg" color="blue-gray" label="비밀번호" onChange={handleCheckPassword} />
        <MarginBox />
      </InputBox>
      <ButtonBox>
        <LoginButton
          variant="gradient"
          color="white"
          style={{ color: '#1CD6C9' }}
          disabled={!(!!userLoginData.email && !!userLoginData.password)}
          onClick={handleLoginRequest}
        >
          로그인
        </LoginButton>
        <SignupButton variant="text" color="white" onClick={changeMode}>
          회원가입
        </SignupButton>
      </ButtonBox>
    </Contanier>
  );
}

const Contanier = styled.div`
  ${tw`font-spoq`}
`;

const MainSection = styled.div`
  ${tw`text-center my-12 text-5xl font-ibm text-white font-bold`}
`;

const InputBox = styled.div`
  width: 90%;
  ${tw`mx-auto mt-28`}
`;

const EmailInput = styled(Input)`
  min-width: 100px;
  color: gray;
  ${tw`border`};
`;

const LoginButton = styled(Button)`
  ${tw`w-40 relative text-sm`}
`;

const SignupButton = styled(Button)`
  transform: translateY(0.5rem);
  ${tw``}
`;
const MarginBox = styled.div`
  ${tw`my-8`}
`;

const ButtonBox = styled.div`
  ${tw`grid justify-items-center mt-20`}
`;

const ErrorMsg = styled.div`
  min-height: 2rem;
  ${tw`text-gain text-sm`}
`;
