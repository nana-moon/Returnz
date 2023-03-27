import React, { useState } from 'react';
import { keyframes } from 'styled-components';
import tw, { styled } from 'twin.macro';

export default function Turn() {
  const [time, setTime] = useState(60);

  setTimeout(() => {
    const copy = time;
    if (copy > 0) {
      setTime(copy - 1);
    }
  }, 1000);
  return (
    <TurnContanier>
      <CountSection>턴 1/12</CountSection>
      <BarSection> </BarSection>
      {time > 0 && <TimeSection> 남은시간 : {time}초 </TimeSection>}
      {/* <Progress label="남은시간" value={88} color="cyan" /> */}
    </TurnContanier>
  );
}

const shake = keyframes`
  0% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(-4px);
  }
  50% {
    transform: translateY(0px);
  }
  75% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0px);
  }
`;
const moreshake = keyframes`
  0% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(-4px);
  }
  50% {
    transform: translateY(0px);
  }
  75% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const BarTimer = keyframes`
  0% {
    ${tw`w-[100%] bg-primary`}
  }
  79.9%{
    ${tw`bg-primary`}
  }
  80% {
    ${tw`bg-gain`}
  }
  100% {
    ${tw`w-[0%] bg-gain`}
  }
`;

const BarTimerText = keyframes`
  0% {
    ${tw`text-black`}
  }
  79.9%{
    ${tw`text-black`}
  }
  80% {
    ${tw`text-gain`}
  }
  100% {
    ${tw`text-gain`}
  }
`;

const BarSection = styled.div`
  animation: ${BarTimer} 60s, ${shake} 0.3s 40 48s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  ${tw`w-[100%] bg-primary rounded-full absolute bottom-0 text-center h-6`}
`;

const TurnContanier = styled.div`
  ${tw`border bg-white rounded-xl h-[8%] relative`}
`;

const CountSection = styled.div`
  ${tw`text-center`}
`;

const TimeSection = styled.div`
  animation: ${BarTimerText} 60s, ${shake} 0.3s 40 48s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  ${tw`absolute bottom-0 text-center w-[100%] bg-transparent`}
`;
