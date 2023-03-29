import { React, useState } from 'react';
import tw, { styled } from 'twin.macro';
import TodayTopUserItem from './Items/TodayTopUserItem';
import wordDummy from './todayWordDummy';

export default function TodayTopUser() {
  const [data] = useState(wordDummy);
  return (
    <TopUserContainer>
      <TopUserTitle>수익률 TOP 10</TopUserTitle>
      <TopUserBox>
        {data.map((person, i) => {
          // eslint-disable-next-line react/no-array-index-key
          return <TodayTopUserItem person={person} key={i} />;
        })}
      </TopUserBox>
    </TopUserContainer>
  );
}

const TopUserContainer = styled.div`
  ${tw`justify-center`}
`;

const TopUserBox = styled.div`
  ${tw``}
`;

const TopUserTitle = styled.div`
  ${tw`text-3xl text-center mb-4`}
`;
