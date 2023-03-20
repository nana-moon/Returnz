import { React, useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { Input, Button } from '@material-tailwind/react';

export default function Signup({ changeMode }) {
  const [userSignupData, setUserSignupData] = useState({
    email: false,
    password: false,
    passwordConfirmation: false,
    nickname: false,
  });
  const [userPassword, setuserPassword] = useState('');
  const [EmailCheck, setEmailCheck] = useState(true);
  const [nicknameCheck, setnicknameCheck] = useState(true);
  const [PasswordCheck, setPasswordCheck] = useState(true);
  const [confirmPassword, setconfirmPassword] = useState(true);

  const handleSignupRequest = () => {
    console.log(userSignupData, '이 데이터들 api 요청 보낼거임');
  };

  const handleCheckEmail = (e) => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      // console.log('이메일 유효성검사 성공', e.target.value);
      setEmailCheck(true);
      const copy = { ...userSignupData };
      copy.email = e.target.value;
      setUserSignupData(copy);
    } else {
      // console.log('이메일 유효성검사 실패', e.target.value);
      setEmailCheck(false);
      const copy = { ...userSignupData };
      copy.email = false;
      setUserSignupData(copy);
    }
  };
  const handleCheckNickname = (e) => {
    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{3,10}$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      setnicknameCheck(true);
      const copy = { ...userSignupData };
      copy.nickname = e.target.value;
      setUserSignupData(copy);
    } else {
      setnicknameCheck(false);
      const copy = { ...userSignupData };
      copy.nickname = false;
      setUserSignupData(copy);
    }
  };
  const handleCheckPassword = (e) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      setPasswordCheck(true);
      setuserPassword(e.target.value);
      const copy = { ...userSignupData };
      copy.password = e.target.value;
      setUserSignupData(copy);
    } else {
      setPasswordCheck(false);
      const copy = { ...userSignupData };
      copy.password = false;
      setUserSignupData(copy);
    }
  };
  const handleConfirmPassword = (e) => {
    if (e.target.value === '' || e.target.value === userPassword) {
      setconfirmPassword(true);
      const copy = { ...userSignupData };
      copy.passwordConfirmation = e.target.value;
      setUserSignupData(copy);
    } else {
      setconfirmPassword(false);
      const copy = { ...userSignupData };
      copy.passwordConfirmation = false;
      setUserSignupData(copy);
    }
  };

  useEffect(() => {}, []);
  return (
    <Contanier>
      <MainSection>회원가입</MainSection>
      <InputBox>
        <Input color="blue-gray" size="lg" label="이메일" onBlur={handleCheckEmail} error={!EmailCheck} />
        {EmailCheck ? <MarginBox /> : <ErrorMsg>이메일 형식이 올바르지 않습니다.</ErrorMsg>}
        <Input color="blue-gray" size="lg" label="닉네임" onBlur={handleCheckNickname} error={!nicknameCheck} />
        {nicknameCheck ? (
          <MarginBox />
        ) : (
          <ErrorMsg>닉네임은 3자 이상 10자 이하여야 하며 특수문자를 사용할 수 없습니다</ErrorMsg>
        )}
        <Input
          color="blue-gray"
          type="password"
          size="lg"
          label="비밀번호"
          onBlur={handleCheckPassword}
          error={!PasswordCheck}
        />
        {PasswordCheck ? (
          <MarginBox />
        ) : (
          <ErrorMsg>비밀번호는 영문, 숫자, 특수문자(@$!%*#?&) 포함, 6자 이상 20자 이하여야 합니다.</ErrorMsg>
        )}

        <Input
          color="blue-gray"
          type="password"
          size="lg"
          label="비밀번호 확인"
          onChange={handleConfirmPassword}
          error={!confirmPassword}
        />
        {confirmPassword ? <MarginBox /> : <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>}
      </InputBox>
      <ButtonBox>
        <SignupButton
          variant="gradient"
          color="white"
          disabled={
            !(
              !!userSignupData.email &&
              !!userSignupData.password &&
              !!userSignupData.passwordConfirmation &&
              !!userSignupData.nickname
            )
          }
          onClick={handleSignupRequest}
        >
          회원가입
        </SignupButton>
        <LoginButton variant="text" color="white" onClick={changeMode}>
          로그인
        </LoginButton>
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
  ${tw`mx-auto`}
`;
const ButtonBox = styled.div`
  transform: translateY(-0.35rem);
  ${tw`grid justify-items-center`}
`;
const MarginBox = styled.div`
  ${tw`my-6`}
`;

const SignupButton = styled(Button)`
  ${tw`w-40 relative text-sm text-primary`}
`;

const LoginButton = styled(Button)`
  transform: translateY(0.5rem);
  ${tw``}
`;

const ErrorMsg = styled.div`
  min-height: 2rem;
  ${tw`text-gain text-sm`}
`;
