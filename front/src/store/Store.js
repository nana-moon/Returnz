import { configureStore } from '@reduxjs/toolkit';
import { BuySellData } from './BuySellModal/BuySell.reducer';
import { test } from './TestFolder/Test.reducer';

export const store = configureStore({
  reducer: {
    BuySell: BuySellData.reducer,
    test: test.reducer,
  },
});
