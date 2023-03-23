/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const BuySellData = createSlice({
  name: 'BuySellData',
  initialState: {
    ifbuy: {
      companyName: '',
      orderPrice: '',
      holdingCash: 10000000,
    },
    ifsell: {
      companyName: '',
      orderPrice: '',
      holdingcount: '',
    },
    ifopen: {
      isOpen: false,
      isType: '',
    },
  },
  reducers: {
    receiveBuyData: (state, action) => {
      state.ifbuy.companyName = action.payload.companyName;
      state.ifbuy.orderPrice = action.payload.orderPrice;
    },
    receiveSellData: (state, action) => {},
    receiveSetting: (state, action) => {
      state.ifopen = action.payload;
    },
  },
});

export const { receiveBuyData, receiveSellData, receiveSetting } = BuySellData.actions;
export default BuySellData;
