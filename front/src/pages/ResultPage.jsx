import React from 'react';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';
import RankResult from '../components/result/RankResult';
import ResultInfo from '../components/result/info/ResultInfo';
import UnlockResult from '../components/result/UnlockResult';
import Chatting from '../components/chatting/Chatting';

export default function ResultPage() {
  return (
    <ResultContainer>
      <RankResult />
      <ResultInfo />
      <LeftBottomSection>
        <UnlockResult />
        <Button to="/">나가기</Button>
      </LeftBottomSection>
      <Chatting />
    </ResultContainer>
  );
}

const ResultContainer = styled.div`
  gap: 20px;
  margin-top: 40px;
  width: 75%;
  display: grid;
  grid-template: 3fr 2fr / 1fr 2fr;
`;

const LeftBottomSection = styled.div`
  ${tw`flex flex-col gap-5`}
`;

const Button = styled(Link)`
  ${tw`w-[100%] min-h-[50px] border-2 border-black flex justify-center items-center bg-white`}
`;
