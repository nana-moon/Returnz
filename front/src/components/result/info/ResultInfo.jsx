import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import ReturnGraph from './ReturnGraph';
import TradeList from './TradeList';

export default function ResultInfo() {
  const data = [
    {
      label: '수익률 그래프',
      value: 'graph',
      desc: <ReturnGraph />,
    },
    {
      label: '매매내역',
      value: 'trade',
      desc: <TradeList />,
    },
  ];
  const [username, setUsername] = useState('gio');

  return (
    <InfoContainer>
      <InfoHeader>📈 {username} 님의 게임 로그</InfoHeader>
      <Tabs id="custom-animation" value="html">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </InfoContainer>
  );
}

const InfoContainer = styled.div`
  ${tw`border bg-white rounded-xl p-2 font-spoq`}
`;

const InfoHeader = styled.header`
  ${tw` bg-white flex justify-center items-center h-10 font-bold`}
`;
