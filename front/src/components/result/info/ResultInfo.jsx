import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import ReturnGraph from './ReturnGraph';
import TradeList from './TradeList';

export default function ResultInfo() {
  const [username, setUsername] = useState('gio');
  const [isGraph, setIsGraph] = useState(true);
  const handleInfo = (e) => {
    e.target.value === 'graph' ? setIsGraph(true) : setIsGraph(false);
  };
  return (
    <InfoContainer>
      <InfoHeader>{username} 님의 주식 그래프</InfoHeader>
      <InfoButton value="graph" onClick={handleInfo}>
        그래프
      </InfoButton>
      <InfoButton value="trade" onClick={handleInfo}>
        매매내역
      </InfoButton>
      {isGraph ? <ReturnGraph /> : <TradeList />}
    </InfoContainer>
  );
}

const InfoContainer = styled.div`
  ${tw`border-2 border-black bg-white`}
`;

const InfoHeader = styled.header`
  ${tw`border-2 border-black bg-white h-[10%] flex justify-center items-center`}
`;

const InfoButton = styled.button`
  ${tw`border-2 border-black w-[50%] h-[10%] rounded-t-xl`}
`;
