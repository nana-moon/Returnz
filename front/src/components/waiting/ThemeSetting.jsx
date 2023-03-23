import React from 'react';
import tw, { styled } from 'twin.macro';
import { MdOutlineCoronavirus } from 'react-icons/md';

export default function ThemeSetting({ getIsUser, getTheme }) {
  const handleIsUser = () => {
    getIsUser();
  };
  const handleTheme = (e) => {
    getTheme(e.target.value);
  };
  return (
    <ThemeContainer>
      <ThemeBox onClick={handleTheme} value="코로나">
        최근 한 달
      </ThemeBox>
      <ThemeBox onClick={handleTheme} value="코로나">
        최근 1년
      </ThemeBox>
      <ThemeBox onClick={handleTheme} value="코로나" />
      <ThemeBox onClick={handleTheme} value="금융위기">
        금융위기
      </ThemeBox>
      <ThemeBox onClick={handleTheme} value="버블닷컴">
        버블닷컴
      </ThemeBox>
      <ThemeBox onClick={handleIsUser}>사용자설정</ThemeBox>
    </ThemeContainer>
  );
}
const ThemeContainer = styled.div`
  ${tw`border bg-white rounded-xl w-[50%] grid grid-cols-2 grid-rows-3 gap-2 p-2`}
`;

const ThemeBox = styled.button`
  ${tw`border rounded-xl w-[100%] flex justify-center items-center hover:bg-blue-gray-50 focus:bg-blue-gray-50`}
`;
