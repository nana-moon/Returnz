import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Rate from '../components/game/Rate';
import Stocks from '../components/game/StockList';
import HoldingList from '../components/game/HoldingList';
import Turn from '../components/game/Turn';
import Graph from '../components/game/Graph';
import StockInfo from '../components/game/StockInfo';
import Header from '../components/common/Header';
import { handleGetGameData, handleMoreGameData } from '../store/gamedata/GameData.reducer';
import { stockDataList } from '../store/gamedata/GameData.selector';

export default function GamePage() {
  const [count, setCount] = useState(0);
  const testdata = useSelector(stockDataList);
  const dispatch = useDispatch();

  const readd = () => {
    console.log(testdata, 'test');
  };

  const axiospost = () => {
    const datas = {
      roomId: '30def8aa-ebbf-405b-9555-e6d1a6c730ac',
      gamerId: 47,
    };
    axios
      .post('http://j8c106.p.ssafy.io/api/games/game', datas)
      .then((res) => {
        if (count === 0) {
          console.log(res.data, '데이터보냄');
          dispatch(handleGetGameData(res.data.Stocks));
        } else {
          console.log(res.data, '데이터보냄');
          dispatch(handleMoreGameData());
        }
        const copy = count;
        setCount(copy + 1);
        console.log(count, 'count');
      })
      .catch((err) => {
        console.log(err);
      });
  };
import UserLogList from '../components/game/userlog/UserLogList';
import Chatting from '../components/chatting/Chatting';

export default function GamePage() {
  const { state } = useLocation();
  console.log(state, '-----잘나옴-----');
  return (
    <>
      <Header />
      <GameContainer>
        <LeftSection>
          {/* <div onClick={readd} onKeyDown={readd} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>
            Redux 데이터 테스트
          </div>
          <div onClick={axiospost} onKeyDown={axiospost} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>
            시작 테스트
          </div> */}
          <Rate />
          <Stocks />
          <HoldingList />
        </LeftSection>
        <MiddleSection>
          <Turn />
          <Graph />
          <StockInfo />
        </MiddleSection>
        <RightSection>
          <UserLogList />
          <Chatting />
        </RightSection>
      </GameContainer>
    </>
  );
}

const GameContainer = styled.div`
  ${tw`grid grid-cols-12 gap-5 w-[100%] p-5 font-spoq`}
`;
const LeftSection = styled.div`
  max-height: 88vh;
  ${tw`col-span-3 gap-5 h-screen`};
`;
const MiddleSection = styled.div`
  max-height: 88vh;
  ${tw`col-span-6 gap-5`}
`;
const RightSection = styled.div`
  max-height: 88vh;
  ${tw`col-span-3 grid gap-5`}
`;
