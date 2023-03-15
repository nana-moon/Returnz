import React from 'react';
import tw, { styled } from 'twin.macro';

export default function GameSetting() {
  return <SettingContainer>GameSetting</SettingContainer>;
}
const SettingContainer = styled.div`
  ${tw`border-2 border-black w-[50%]`}
`;
