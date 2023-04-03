import { React, useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';

import TodayTopUserItem from './Items/TodayTopUserItem';

import { getTopTenRank } from '../../apis/homeApi';

export default function TodayTopUser() {
  const [topTenUsers, setTopTenUsers] = useState([]);
  const rankIcon = ['🥇', '🥈', '🥉', 4, 5, 6, 7, 8, 9, 10];
  useEffect(() => {
    async function fetchData() {
      const res = await getTopTenRank();
      setTopTenUsers(res);
      console.log(res, 'bdsfbi');
    }
    fetchData();
  }, []);

  return (
    <TopUserContainer>
      <TopUserTitle> 🏆 수익률 TOP 10</TopUserTitle>
      <TopUserBox>
        {topTenUsers?.map((person, i) => {
          // eslint-disable-next-line react/no-array-index-key
          return <TodayTopUserItem person={person} key={person.username} img={rankIcon[i]} />;
        })}
      </TopUserBox>
    </TopUserContainer>
  );
}

const TopUserContainer = styled.div`
  position: relative;
  ${tw`justify-center`};
`;
const TopUserTitle = styled.div`
  transform: translateY(-22px);
  left: 5%;
  ${tw`text-3xl text-center font-bold border w-[90%] absolute bg-white rounded-2xl border-negative border-2 py-1`}
`;
const TopUserBox = styled.div`
  ${tw`w-[100%] h-[100%] border bg-white rounded-2xl border-negative border-2 pt-5`}
`;

// const GraphContainer = styled.div`
//   margin-top: 1.25rem;
//   max-hegiht: 60%;
//   ${tw`border bg-white rounded-xl h-[60%]`}
// `;
