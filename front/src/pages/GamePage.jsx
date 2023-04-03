import React, { useState } from 'react';
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
  handleGetTodayDate,
  handleGetStockInformation,
  handleGetStockNews,
} from '../store/gamedata/GameData.reducer';
import { gamerStockList, todayDate } from '../store/gamedata/GameData.selector';
import UserLogList from '../components/game/userlog/UserLogList';
import Chatting from '../components/chatting/Chatting';
import { getGameId, getGameRoomId, getGamerId } from '../store/roominfo/GameRoom.selector';
import { selectedIdx, sellNeedData } from '../store/buysellmodal/BuySell.selector';
import { getNewsApi } from '../apis/gameApi';

export default function GamePage() {
  const testdata = useSelector(gamerStockList);
  const roomNum = useSelector(getGameRoomId);
  const gamerNum = useSelector(getGamerId);
  const holdingdata = useSelector(sellNeedData);
  const selectIdx = useSelector(selectedIdx);
  // 뉴스가져올떄 필요한 데이터
  const gameId = useSelector(getGameId);
  const keys = Object.keys(testdata);
  const Date = useSelector(todayDate);

  const dispatch = useDispatch();

  const readd = () => {
    console.log(testdata, '보유 종목상태');
    // console.log(holdingdata, 'se', selectIdx, 'testdata2');
    // console.log('뉴스가져올데이터', gameId, keys, Date);
  };

  const axiospost = async () => {
    // 뉴스
    const datas = {
      roomId: roomNum,
      gamerId: gamerNum,
    };

    await axios
      .post('/games/game', datas)
      .then((res) => {
        console.log(res.data, '턴 넘어갔어');
        dispatch(handleMoreGameData(res.data.Stocks));
        dispatch(handleUpdateHoldingData(res.data.gamerStock));
        dispatch(handleGetStockInformation(res.data.stockInformation));
        dispatch(handleGetTodayDate(res.data.currentDate));
      })
      .catch((err) => {
        console.log(err);
      });

    const getNews = [];

    for (let i = 0; i < keys.length; i += 1) {
      const data = {
        id: gameId,
        companyCode: keys[i],
        articleDateTime: Date,
      };
      // eslint-disable-next-line no-await-in-loop
      const newsTmp = await getNewsApi(data);
      getNews.push({ [keys[i]]: newsTmp });
      // console.log('중간점검', newsTmp, getNews);
    }

    dispatch(handleGetStockNews(getNews));
  };
  return (
    <>
      <Header />
      <GameContainer>
        <LeftSection>
          <div onClick={readd} onKeyDown={readd} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>
            Redux 데이터 확인용 버튼
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
