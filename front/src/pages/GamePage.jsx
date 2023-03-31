import React from 'react';
import tw, { styled } from 'twin.macro';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Rate from '../components/game/Rate';
import Stocks from '../components/game/StockList';
import HoldingList from '../components/game/HoldingList';
import Turn from '../components/game/Turn';
import Graph from '../components/game/Graph';
import StockInfo from '../components/game/StockInfo';
import Header from '../components/common/Header';
import {
  handleMoreGameData,
  handleUpdateHoldingData,
  handleGetStockInformation,
} from '../store/gamedata/GameData.reducer';
import { gamerStockList } from '../store/gamedata/GameData.selector';
import UserLogList from '../components/game/userlog/UserLogList';
import Chatting from '../components/chatting/Chatting';
import { getGameRoomId, getGamerId } from '../store/roominfo/GameRoom.selector';

export default function GamePage() {
  const testdata = useSelector(gamerStockList);
  const roomNum = useSelector(getGameRoomId);
  const gamerNum = useSelector(getGamerId);

  const dispatch = useDispatch();

  const readd = () => {
    console.log(testdata, 'test');
  };

  const axiospost = () => {
    const datas = {
      roomId: roomNum,
      gamerId: gamerNum,
    };

    axios
      .post('/games/game', datas)
      .then((res) => {
        console.log(res.data, 'ddd');
        dispatch(handleMoreGameData(res.data.Stocks));
        dispatch(handleUpdateHoldingData(res.data.gamerStock));
        dispatch(handleGetStockInformation(res.data.stockInformation));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Header />
      <GameContainer>
        <LeftSection>
          <div onClick={readd} onKeyDown={readd} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>
            Redux 데이터 테스트
          </div>
          <div onClick={axiospost} onKeyDown={axiospost} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>
            시작 테스트
          </div>
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
          <div className="h-[50%]">
            <Chatting />
          </div>
        </RightSection>
      </GameContainer>
    </>
  );
}
const GameContainer = styled.div`
  ${tw`grid grid-cols-12 gap-5 w-[100%] p-5 font-spoq mt-14`}
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
  ${tw`col-span-3 flex flex-col gap-5 h-screen`}
`;
