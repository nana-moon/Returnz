import React from 'react';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';

export default function TopButtons() {
  return (
    <ButtonsContainer>
      <StartGameButton to="/waiting">게임 개설하기</StartGameButton>
      <StartTutorialButton t0="/tutorial">튜토리얼 보기</StartTutorialButton>
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.div`
  ${tw`flex justify-center gap-20`}
`;

const StartGameButton = styled(Link)`
  ${tw`text-white bg-primary hover:bg-dprimary focus:ring-4 focus:outline-none focus:ring-cyan-100 font-bold text-3xl rounded-lg px-6 py-4 text-center`}
`;

const StartTutorialButton = styled(Link)`
  ${tw`text-primary bg-white border-4 border-primary hover:bg-cyan-100 focus:border-dprimary font-bold text-3xl rounded-lg px-6 py-3.5 text-center`}
`;
