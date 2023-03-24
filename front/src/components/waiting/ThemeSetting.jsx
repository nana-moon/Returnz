import React from 'react';
import tw, { styled } from 'twin.macro';
import { Tooltip } from '@material-tailwind/react';

export default function ThemeSetting({ getIsUserSetting, getTheme }) {
  const themeList = [
    { name: '최근 한 달', description: '최신 한 달간의 주식 차트 상황' },
    {
      name: '美, 금리 빅스텝',
      description:
        '미국 연방준비제도(Fed)가 코로나 이후 급상승한 물가를 잡기 위해 기준금리를 예상보다 급격하게 인상한 상황',
    },
    {
      name: '코로나 바이러스',
      description: '2019년을 기점으로 코로나 바이러스가 창궐하며 금리를 낮추는 경제 정책이 증폭된 상황',
    },
    {
      name: '리먼-브라더스 사태',
      description: '리먼-브라더스 사태는 금융위기의 시작점이었으며, 글로벌 증시에 대한 패닉과 불안감을 유발시킨 상황',
    },
    {
      name: '닷컴버블',
      description:
        '인터넷 기업들의 과도한 투자와 기대에 기인한 거품으로, 급격한 상승과 함께 대규모 하락을 유발하며 글로벌 증시에 큰 충격을 가져온 상황',
    },
  ];

  const handleTheme = (e) => {
    e.target.value === 'usersetting' && getIsUserSetting();
    getTheme(e.target.value);
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
            <ThemeBox key={theme.name} onClick={handleTheme} value={theme.name}>
              {theme.name}
            </ThemeBox>
          </Tooltip>
        );
      })}
      <ThemeBox value="usersetting" onClick={handleTheme}>
        사용자설정
      </ThemeBox>
    </ThemeContainer>
  );
}
const ThemeContainer = styled.div`
  ${tw`border bg-white rounded-xl w-[50%] grid grid-cols-2 grid-rows-3 gap-2 p-2`}
`;

const ThemeBox = styled.button`
  ${tw`border rounded-xl w-[100%] flex justify-center items-center hover:bg-blue-gray-50 focus:bg-blue-gray-50`}
`;
