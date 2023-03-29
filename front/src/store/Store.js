import { configureStore } from '@reduxjs/toolkit';
import { test } from './TestFolder/Test.reducer';
import { BuySellData } from './buysellmodal/BuySell.reducer';
import { gamedata } from './gamedata/GameData.reducer';
import { userInfo } from './userinfo/UserInfo.reducer';

export const store = configureStore({
  reducer: {
    BuySell: BuySellData.reducer,
    gamedatas: gamedata.reducer,
    userInfo: userInfo.reducer,
    test: test.reducer,
  },
});
