import { React, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Input, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../apis/signApi';

export default function Login({ changeMode }) {
  const navigate = useNavigate();
  const [emailCheck, setEmailCheck] = useState(true); // 이메일 형식이 잘못되면 에러 출력
  const [userLoginData, setUserLoginData] = useState({
    username: false,
    password: false,
  }); // api요청으로 가져갈 데이터

  const handleCheckEmail = (e) => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    // 이메일 정규표현식
    if (e.target.value === '' || regex.test(e.target.value)) {
      // 입력란이 공백이거나 값이 입력되면 유효성검사 진행
      setEmailCheck(true);
      const copy = { ...userLoginData };
      copy.username = e.target.value;
      setUserLoginData(copy);
    } else {
      setEmailCheck(false);
      const copy = { ...userLoginData };
      copy.username = false;
      setUserLoginData(copy);
    }
  };
  const handleCheckPassword = (e) => {
    const copy = { ...userLoginData };
    copy.password = e.target.value;
    setUserLoginData(copy);
  };

  // 버튼이 활성화 된 상태에서 엔터 키를 누르면 로그인 시도
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!!userLoginData.username && !!userLoginData.password) {
        handleLoginRequest();
      }
    }
  };

  // 로그인 요청후 result가 true라면 메인페이지 이동, 실패 시 에러메세지 출력
  const handleLoginRequest = async () => {
    const result = await userLogin(userLoginData);
    result === true ? navigate('/') : alert(result);
  };
  return (
    <Contanier>
      <MainSection>Login</MainSection>
      <form>
        <InputBox>
          <EmailInput
            autoComplete="username"
            color="blue-gray"
            size="lg"
            label="이메일"
            onBlur={handleCheckEmail} // 포커스 해제됐을 때 유효성 검사 진행
            error={!emailCheck} // 유효성 검사 실패했을 때 에러
          />
          {emailCheck ? <MarginBox /> : <ErrorMsg>이메일 형식이 올바르지 않습니다.</ErrorMsg>}
          <Input
            autoComplete="current-password"
            type="password"
            size="lg"
            color="blue-gray"
            label="비밀번호"
            onChange={handleCheckPassword}
            onKeyPress={onKeyPress}
          />
          <MarginBox />
        </InputBox>
      </form>
      <ButtonBox>
        <LoginButton
          variant="gradient"
          color="white"
          style={{ color: '#1CD6C9' }}
          disabled={!(!!userLoginData.username && !!userLoginData.password)} // request form의 두개의 데이터가 둘다 false가 아니면(둘다 값이 있다면) 버튼 활성화
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
  color: black;
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
