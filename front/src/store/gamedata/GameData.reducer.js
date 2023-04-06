/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 상장종목
  stockDataList: {},
  // 오늘날짜
  todayDate: null,
  // 그래프
  stockGraphList: [],
  // 영업날이 아님
  noWorkDay: [],
  // 뉴스,
  stockNews: [],
  // 주가정보
  stockInformation: {},
  // 종목 내용
  stockdescription: {},
  // 보유종목
  gamerStockList: [{}],
  // 환율 한국금리 미국금리
  changeInterest: {
    date: null,
    exchangeRate: 0,
    korea: 0,
    usa: 0,
  },
  // 유저 데이터
  gamerDataList: {
    deposit: 10000000,
    ammountOfBuy: 0,
  },
  // 턴 데이터
  gameTurn: {
    nowTurn: 0,
    maxTurn: 0,
    dayTurn: 2,
    returnTime: null,
  },
};

export const gamedata = createSlice({
  name: 'gamedata',
  initialState,
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
    // 날짜받기
    handleGetTodayDate(state, action) {
      state.todayDate = action.payload;
    },
    // 두번째 부터
    handleMoreGameData(state, action) {
      if (action.payload === []) {
        state.gameTurn.nowTurn += 1;
      } else {
        state.gameTurn.nowTurn += 1;

        console.log('last turn check, gamedatareducer', state.gameTurn.nowTurn);
        if (state.gameTurn.nowTurn === state.gameTurn.maxTurn) {
          const tmp = 0;
          console.log(tmp);
        } else {
          const keys = Object.keys(state.stockDataList);
          const actionkeys = Object.keys(action.payload);
          let tmpdata;
          const noWorkIdx = [];

          for (const key of keys) {
            state.gameTurn.dayTurn = action.payload[key].length + 1;
            if (action.payload[key][action.payload[key].length - 1].volume === '0') {
              // const lastIndex = state.stockDataList[key].length - 1;
              // state.stockDataList[key].push(state.stockDataList[key][lastIndex]);
              state.stockDataList[key] = [...state.stockDataList[key], ...action.payload[key]];
            } else {
              state.stockDataList[key] = [...state.stockDataList[key], ...action.payload[key]];
            }
          }

          for (const key of actionkeys) {
            for (let i = 0; i < action.payload[key].length; i += 1) {
              const name = action.payload[key][i].companyName;
              const datex = action.payload[key][i].dateTime;
              const candley = [
                action.payload[key][i].open,
                action.payload[key][i].high,
                action.payload[key][i].low,
                action.payload[key][i].close,
              ];
              const liney = action.payload[key][i].volume;

              if (liney === '0') {
                console.log(candley, candley[0]);
              }

              if (candley[0] === '0' || candley[1] === '0') {
                const lastIndex = state.stockGraphList.findIndex((item) => Object.keys(item)[i] === name);
                const lastCandle = state.stockGraphList[lastIndex][name].candledata.slice(-1)[i];
                const lastLine = state.stockGraphList[lastIndex][name].linedata.slice(-1)[i];
                console.log('영업일이 아님', lastIndex, lastCandle, lastLine, action.payload[key][i]);
                noWorkIdx.push(lastIndex);
                tmpdata = {
                  [name]: { candledata: { x: datex, y: lastCandle.y }, linedata: { x: datex, y: lastLine.y } },
                };
              } else {
                tmpdata = { [name]: { candledata: { x: datex, y: candley }, linedata: { x: datex, y: liney } } };
              }
              for (let j = 0; j < action.payload[key].length; j += 1) {
                const index = state.stockGraphList.findIndex((item) => Object.keys(item)[j] === name);
                if (index !== -1) {
                  state.stockGraphList[index][name].candledata.push(tmpdata[name].candledata);
                  state.stockGraphList[index][name].linedata.push(tmpdata[name].linedata);
                }
              }
            }
          }

          state.noWorkDay = noWorkIdx;
        }
      }
    },

    handleUpdateHoldingData(state, action) {
      const holdingdata = [];
      for (let i = 0; i < action.payload.length; i += 1) {
        if (action.payload[i].totalCount > 0) {
          holdingdata.push(action.payload[i]);
        }
      }
      state.gamerStockList = holdingdata;
    },
    // 뉴스 업데이트
    handleGetStockNews(state, action) {
      console.log('업데이트된 뉴스: ', action.payload);
      state.stockNews = action.payload;
    },
    // 주가정보,
    handleGetStockInformation(state, action) {
      state.stockInformation = action.payload;
    },
    // 종목 내용
    handleGetStockDescription(state, action) {
      console.log('action:', action.payload);
      state.stockdescription = action.payload;
    },
    // 매수매도 했음
    handleBuySellTrade(state, action) {
      const userInfo = {
        deposit: action.payload.gamer.deposit,
        ammountOfBuy: action.payload.gamer.totalPurchaseAmount,
      };
      state.gamerDataList = userInfo;

      state.gamerStockList = action.payload.gamerStock;
    },
    // 한국금리 미국금리 환율
    handleGetchangeInterest(state, action) {
      state.changeInterest = action.payload;
    },
    setMaxTurn(state, action) {
      state.gameTurn.maxTurn = action.payload;
    },
    setReturnTime(state, action) {
      state.gameTurn.returnTime = action.payload;
    },
    resetGameData(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  handleGetGameData,
  handleGetTodayDate,
  handleGetStockDescription,
  handleMoreGameData,
  handleGetStockInformation,
  handleBuySellTrade,
  handleUpdateHoldingData,
  handleGetStockNews,
  handleGetchangeInterest,
  setMaxTurn,
  setReturnTime,
  resetGameData,
} = gamedata.actions;
export default gamedata;
