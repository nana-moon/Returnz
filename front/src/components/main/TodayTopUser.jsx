import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function TodayTopUser() {
  return (
    <TopUserContainer>
      <TopUserTitle>오늘의 수익률 TOP 10</TopUserTitle>
      <TopUserBox>사람</TopUserBox>
    </TopUserContainer>
  );
}

const TopUserContainer = styled.div`
  ${tw`justify-center`}
`;

const TopUserBox = styled.div`
  ${tw`bg-white border border-negative rounded-lg border-2 px-4 py-1 mx-2`}
`;

const TopUserTitle = styled.div`
  ${tw`text-3xl text-center mb-4`}
`;
