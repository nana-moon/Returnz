import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { keyframes } from 'styled-components';
import Login from '../components/login/Login';
import Signup from '../components/login/Signup';
import Logo from '../components/common/logo.jpg';

export default function LoginPage() {
  const [mode, setMode] = useState(true);

  const changeMode = () => {
    setMode(!mode);
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
        {mode ? <Login changeMode={changeMode} /> : <Signup changeMode={changeMode} />}
      </FrontSection>
    </LoginPageContanier>
  );
}
const SignupMode = keyframes`
  0% {
    transform: translate(20%, -12%);
  }
  100% {
    transform: translate(120%, -12%);
  }
`;

const LoginMode = keyframes`
  0% {
    transform: translate(120%, -12%);
  }
  100% {
    transform: translate(20%, -12%);
  }
`;

const LoginPageContanier = styled.div`
  margin-top: 10%;
  ${tw`relative w-[50%] h-[50%]`}
`;

const BackSection = styled.div`
  min-width: 600px;
  ${tw`bg-white drop-shadow-2xl rounded-xl absolute w-[100%] h-[100%] flex`}
`;

const FrontSection = styled.div`
  animation: ${(props) => (props.mode ? LoginMode : SignupMode)} 0.8s;
  animation-fill-mode: both;
  transform: translate(20%, -12%);
  ${tw`bg-primary drop-shadow-xl rounded-xl absolute w-[40%] h-[130%]`}
`;

const LogoBox = styled.div`
  animation: ${(props) => (props.mode ? SignupMode : LoginMode)} 0.8s;
  animation-fill-mode: both;
  transform: translate(20%);
  margin-top: 60px;
  width: 45%;
  ${tw`flex`}
`;

const ImgBox = styled.div`
  ${tw`w-20 my-auto`}
`;

const TextBox = styled.div`
  font-size: 300%;
  ${tw`font-bold font-ibm ml-2 my-auto`}
`;
