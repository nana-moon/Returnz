import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Tooltip } from '@material-tailwind/react';

export default function ThemeSetting({ getIsUserSetting, getTheme }) {
  // theme state
  const [activeTheme, setActiveTheme] = useState('');

  const themeList = [
    { value: 'LAST_MONTH', name: '최근 한 달', description: '최신 한 달간의 주식 차트 상황' },
    {
      value: 'INTEREST_BIG_STEP',
      name: '美, 금리 빅스텝',
      description:
        '미국 연방준비제도(Fed)가 코로나 이후 급상승한 물가를 잡기 위해 기준금리를 예상보다 급격하게 인상한 상황',
    },
    {
      value: 'COVID',
      name: '코로나 바이러스',
      description: '2019년을 기점으로 코로나 바이러스가 창궐하며 금리를 낮추는 경제 정책이 증폭된 상황',
    },
    {
      value: 'RIEMANN',
      name: '리만-브라더스 사태',
      description: '리먼-브라더스 사태는 금융위기의 시작점이었으며, 글로벌 증시에 대한 패닉과 불안감을 유발시킨 상황',
    },
    {
      value: 'DOTCOM',
      name: '닷컴버블',
      description:
        '인터넷 기업들의 과도한 투자와 기대에 기인한 거품으로, 급격한 상승과 함께 대규모 하락을 유발하며 글로벌 증시에 큰 충격을 가져온 상황',
    },
  ];

  // theme action
  const handleClick = (e) => {
    setActiveTheme(e.currentTarget.value);
    createRipple(e);
    handleTheme(e);
  };

  const handleTheme = (e) => {
    e.currentTarget.value === 'USER' && getIsUserSetting();
    getTheme(e.currentTarget.value);
  };

  const createRipple = (e) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - (rect.left + scrollLeft) - radius}px`;
    circle.style.top = `${e.clientY - (rect.top + scrollTop) - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.parentElement.getElementsByClassName('ripple')[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <ThemeContainer>
      {themeList.map((theme) => {
        return (
          <Tooltip
            key={theme.name}
            className="w-72 text-lg bg-dprimary break-keep text-center"
            content={theme.description}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
          >
            <ThemeBox key={theme.name} value={theme.value} onClick={handleClick} active={activeTheme === theme.value}>
              {theme.name}
            </ThemeBox>
          </Tooltip>
        );
      })}
      <ThemeBox value="USER" onClick={handleTheme}>
        사용자설정
      </ThemeBox>
    </ThemeContainer>
  );
}
const ThemeContainer = styled.div`
  ${tw`bg-white rounded-xl w-[50%] grid grid-cols-2 grid-rows-3 gap-1`}
`;

const ThemeBox = styled.button`
  position: relative; // Add this line
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    transform: scale(0);
    animation: ripple-effect 1s linear forwards;
  }

  @keyframes ripple-effect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  ${tw`flex justify-center items-center border w-[100%] relative drop-shadow-lg bg-white rounded-xl overflow-hidden`}
  ${({ active }) => active && tw`bg-blue-gray-100`}
`;
