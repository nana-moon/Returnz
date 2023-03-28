import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Tooltip } from '@material-tailwind/react';

export default function ThemeSetting({ getIsUserSetting, getTheme }) {
  // theme state
  const [activeTheme, setActiveTheme] = useState('');

  const themeList = [
    { name: 'LAST_MONTH', description: '최신 한 달간의 주식 차트 상황' },
    {
      name: '美, 금리 빅스텝',
      description:
        '미국 연방준비제도(Fed)가 코로나 이후 급상승한 물가를 잡기 위해 기준금리를 예상보다 급격하게 인상한 상황',
    },
    {
      name: 'COVID',
      description: '2019년을 기점으로 코로나 바이러스가 창궐하며 금리를 낮추는 경제 정책이 증폭된 상황',
    },
    {
      name: 'RIEMANN',
      description: '리먼-브라더스 사태는 금융위기의 시작점이었으며, 글로벌 증시에 대한 패닉과 불안감을 유발시킨 상황',
    },
    {
      name: 'DOTCOM',
      description:
        '인터넷 기업들의 과도한 투자와 기대에 기인한 거품으로, 급격한 상승과 함께 대규모 하락을 유발하며 글로벌 증시에 큰 충격을 가져온 상황',
    },
  ];

  // theme action
  const handleClick = (e) => {
    setActiveTheme(e.target.value);
    handleTheme(e);
  };

  const handleTheme = (e) => {
    e.target.value === 'USER' && getIsUserSetting();
    getTheme(e.target.value);
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

    const ripple = button.getElementsByClassName('ripple')[0];

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
            <ThemeBox
              key={theme.name}
              value={theme.name}
              onClick={(createRipple, handleClick)}
              active={activeTheme === theme.name}
            >
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
  ${tw`border bg-white rounded-xl w-[50%] grid grid-cols-2 grid-rows-3 gap-2 p-2`}
`;

const ThemeBox = styled.button`
  ${tw`border rounded-xl w-[100%] flex justify-center items-center hover:border-black`}
  ${({ active }) => active && tw`bg-blue-gray-50`}
  position: relative;
  overflow: hidden;

  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    transform: scale(0);
    animation: ripple-effect 1s linear forwards;
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
