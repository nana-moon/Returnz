import React from 'react';
import tw, { styled } from 'twin.macro';

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
        코로나
      </ThemeBox>
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
  ${tw`border-2 border-black w-[50%] flex flex-wrap`}
`;

const ThemeBox = styled.button`
  ${tw`border-2 border-black w-[50%] flex justify-center items-center bg-white`}
`;
