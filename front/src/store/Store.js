import { configureStore } from '@reduxjs/toolkit';
import { test } from './TestFolder/Test.reducer';
import { BuySellData } from './buysellmodal/BuySell.reducer';
import { gamedata } from './gamedata/GameData.reducer';

export const store = configureStore({
  reducer: {
    BuySell: BuySellData.reducer,
    gamedatas: gamedata.reducer,
    test: test.reducer,
  },
});
