import React from 'react';
import tw, { styled } from 'twin.macro';
import { Button } from '@material-tailwind/react';

export default function TopButtons() {
  return (
    <ButtonsContainer>
      <StartGameButton>게임 개설하기</StartGameButton>
      <Button variant="outlined">outlined</Button>
      <StartGameButton>
        <Button variant="fill" color="primary" className="rounded-lg">
          게임 개설하기
        </Button>
      </StartGameButton>
      <StartTutorialButton>튜토리얼 보기</StartTutorialButton>
      <Button variant="outlined">outlined</Button>
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.div`
  ${tw`flex justify-center gap-10`}
`;
const StartGameButton = styled.div`
  ${tw` rounded text-white font-bold font-spoq`}
`;
const StartTutorialButton = styled.div`
  ${tw`bg-negative`}
`;
