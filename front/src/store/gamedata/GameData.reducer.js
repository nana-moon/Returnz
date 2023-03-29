/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const gamedata = createSlice({
  name: 'gamedata',
  initialState: {
    // 상장종목
    stockDataList: {},
    // 그래프
    stockGraphList: [],
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

      const keys = Object.keys(action.payload);

      for (const key of keys) {
        const companyname = action.payload[key][0].companyName;
        const candle = [];
        const line = [];
        for (let i = 0; i < action.payload[key].length; i += 1) {
          const candletmp = {
            x: new Date(action.payload[key][i].dateTime).toISOString(),
            y: [
              action.payload[key][i].open,
              action.payload[key][i].high,
              action.payload[key][i].low,
              action.payload[key][i].close,
            ],
          };
          const linetmp = {
            x: new Date(action.payload[key][i].dateTime).toISOString(),
            y: action.payload[key][i].volume,
          };
          candle.push(candletmp);
          line.push(linetmp);
        }
        const tmp = { [companyname]: { candledata: candle, linedata: line } };
        state.stockGraphList.push(tmp);
      }
    },
    // 두번째 부터
    handleMoreGameData(state, action) {
      const keys = Object.keys(state.stockDataList);

      console.log(state.stockGraphList, '데이터');

      for (const key of keys) {
        state.stockDataList[key] = [...state.stockDataList[key], ...action.payload[key]];
      }

      // for
    },
    // 뉴스, 주가정보, 종목 내용
    handleGetGameDetailData(state, action) {},
  },
});

export const { handleGetGameData, handleGetGameDetailData, handleMoreGameData } = gamedata.actions;
export default gamedata;
