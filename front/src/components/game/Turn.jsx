import React, { useEffect, useState } from 'react';
import { keyframes } from 'styled-components';
import tw, { styled } from 'twin.macro';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Popover, PopoverHandler, PopoverContent, Button } from '@material-tailwind/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import imgpath from './assets/turnHelp.png';
import { gameTurn } from '../../store/gamedata/GameData.selector';
import { setIsReadyList } from '../../store/roominfo/GameRoom.reducer';

export default function Turn() {
  const [time, setTime] = useState(60);
  const turn = useSelector(gameTurn);
  console.log('turn---------------------', turn);
  const [animationClass, setAnimationClass] = useState('animate');
  // console.log('현재 턴은:', turn);
  let now;
  if (turn.nowTurn + 1 === turn.maxTurn) {
    now = `마지막 턴이 시작됩니다.`;
  } else if (turn.nowTurn + 1 > turn.maxTurn) {
    now = `게임이 종료되었습니다.
    결과 페이지로 이동합니다`;
  } else {
    now = `${turn.nowTurn + 1}번째 턴이 시작됩니다.`;
  }

  useEffect(() => {
    setAnimationClass(''); // 애니메이션 클래스를 제거합니다.
    setTimeout(() => {
      setAnimationClass('animate'); // 애니메이션 클래스를 다시 추가합니다.
      Swal.fire({
        title: `${now}`,
        timer: 1000,
        showConfirmButton: false,
      });
    }, 10);
  }, [turn]);
  useEffect(() => {
    setTime(60);
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [turn]);

  const Icon = [];

  for (let i = 0; i < turn.maxTurn; i += 1) {
    Icon.push(<TurnIcon index={i} num={turn.nowTurn} key={i} />);
  }
  return (
    <TurnContanier>
      <CountSection>
        {Icon}
        <div className="absolute top-1 right-4">
          <Popover
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            placement="left-start"
          >
            <PopoverHandler>
              <Button variant="gradient" color="white" size="sm" className="border border-negative">
                ?
              </Button>
            </PopoverHandler>
            <PopoverContent className="z-20 w-[40%] border-gray-400 shadow-xl shadow-gray-600">
              <img src={imgpath} alt="" />
            </PopoverContent>
          </Popover>
        </div>
      </CountSection>
      <BarSection turn={turn} key={turn.nowTurn} className={`bar ${animationClass}`}>
        {' '}
      </BarSection>
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
  ${tw`absolute bottom-0 text-center w-[100%] bg-transparent`}
`;

const TurnIcon = styled(AiOutlineCheckCircle)`
  color: ${(props) => (props.index < props.num ? 'green' : 'black')};
  font-size: ${(props) => (props.index === props.num ? '32px' : '20px')};
  ${tw`mx-1`};
`;
