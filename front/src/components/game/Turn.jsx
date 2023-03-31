import React, { useState } from 'react';
import { keyframes } from 'styled-components';
import tw, { styled } from 'twin.macro';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function Turn() {
  const [time, setTime] = useState(60);
  const [turn, setTurn] = useState([0, 2, 15]);
  setTimeout(() => {
    const copy = time;
    if (copy > 0) {
      setTime(copy - 1);
    }
  }, 1000);

  const Icon = [];

  for (let i = 0; i < turn[2]; i += 1) {
    Icon.push(<TurnIcon index={i} num={turn[1]} />);
  }
  return (
    <TurnContanier>
      <CountSection>{Icon}</CountSection>
      <BarSection> </BarSection>
      {time > 0 && <TimeSection> 🕒 {time} </TimeSection>}
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
  ${tw`flex w-[90%] items-center h-[70%] mx-10 justify-center`}
`;

const TimeSection = styled.div`
  animation: ${BarTimerText} 60s, ${shake} 0.3s 40 48s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  ${tw`absolute bottom-0 text-center w-[100%] bg-transparent`}
`;

const TurnIcon = styled(AiOutlineCheckCircle)`
  color: ${(props) => (props.index < props.num ? 'green' : 'black')};
  font-size: ${(props) => (props.index === props.num ? '24px' : '20px')};
  ${tw`mx-1`};
`;
