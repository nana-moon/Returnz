/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const gamedata = createSlice({
  name: 'gamedata',
  initialState: {
    // 상장종목, 그래프
    stockDataList: {},
    // 뉴스, 주가정보, 종목 내용
    stockDetailDataList: {},
    // 보유종목
    gamerStockList: {},
    // 유저 데이터
    gamerDataList: {},
  },
  reducers: {
    // 첫턴 데이터들
    handleGetGameData(state, action) {
      state.stockDataList = action.payload;
    },
    // 두번째 부터
    handleMoreGameData(state, action) {},
    // 뉴스, 주가정보, 종목 내용
    handleGetGameDetailData(state, action) {},
  },
});

export const { handleGetGameData, handleGetGameDetailData, handleMoreGameData } = gamedata.actions;
export default gamedata;
