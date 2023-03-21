/* eslint-disable import/order */
import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Login from '../components/login/Login';
import Signup from '../components/login/Signup';
import Logo from '../components/common/logo.jpg';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const navigate = useNavigate();
  // 로그인 페이지에 왔을 때 쿠키에있는 access_token을 통해 로그인 상태인지 확인 로그인 상태라면 이전페이지로 리다이렉트
  useEffect(() => {
    if (Cookies.get('access_token')) {
      setTimeout(() => {
        alert('이미 로그인 되어있습니다.');
        navigate(-1);
      }, 200);
    } else {
      console.log('비로그인 상태');
    }
  });

  const [mode, setMode] = useState('login');

  // 회원가입모드 로그인모드
  const changeMode = () => {
    if (mode === 'login') {
      setMode('signup');
    } else {
      setMode('login');
    }
  };

  return (
    <LoginPageContanier>
      <BackSection>
        <LogoBox mode={mode}>
          <ImgBox>
            <img src={Logo} alt="Logo" />
          </ImgBox>
          <TextBox>Returnz</TextBox>
        </LogoBox>
      </BackSection>
      <FrontSection mode={mode}>
        {mode === 'login' ? <Login changeMode={changeMode} /> : <Signup changeMode={changeMode} />}
      </FrontSection>
    </LoginPageContanier>
  );
}
const SignupMode = keyframes`
  0% {
    transform: translate(15%, -12%);
  }
  100% {
    transform: translate(125%, -12%);
  }
`;

const LoginMode = keyframes`
  0% {
    transform: translate(125%, -12%);
  }
  100% {
    transform: translate(15%, -12%);
  }
`;

const LoginPageContanier = styled.div`
  margin-top: 10%;
  ${tw`relative w-[50%] h-[50%]`}
`;

const BackSection = styled.div`
  min-width: 600px;
  min-height: 400px;
  ${tw`bg-white drop-shadow-2xl rounded-xl absolute w-[100%] h-[100%] flex`}
`;

const FrontSection = styled.div`
  animation: ${(props) => (props.mode === 'login' ? LoginMode : SignupMode)} 0.8s;
  animation-fill-mode: both;
  transform: translate(20%, -12%);
  min-width: 250px;
  min-height: 550px;
  ${tw`bg-primary drop-shadow-xl rounded-xl absolute w-[40%] h-[130%]`}
`;

const LogoBox = styled.div`
  animation: ${(props) => (props.mode === 'login' ? SignupMode : LoginMode)} 0.8s;
  animation-fill-mode: both;
  width: 45%;
  padding-right: 30px;
  ${tw`flex my-auto`}
`;

const ImgBox = styled.div`
  ${tw`w-20 my-auto`}
`;

const TextBox = styled.div`
  font-size: 300%;
  ${tw`font-bold font-ibm ml-2 my-auto`}
`;
