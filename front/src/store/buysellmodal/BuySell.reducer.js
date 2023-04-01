/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const BuySellData = createSlice({
  name: 'BuySellData',
  initialState: {
    ifbuy: {
      companyName: '',
      orderPrice: '',
    },
    ifsell: {
      companyName: '',
      orderPrice: '',
      companyCode: '',
      holdingcount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    ifopen: {
      isOpen: false,
      isType: '',
    },
    isSelect: {
      idx: 0,
    },
    holdingdata: {},
  },
  reducers: {
    getCompanyCodeList: (state, action) => {
      const keys = Object.keys(action.payload);
      const count = [];
      for (let i = 0; i < keys.length; i += 1) {
        const tmp = { [keys[i]]: 0 };
        count.push(tmp);
      }
      state.ifsell.holdingcount = keys;
    },
    receiveBuyData: (state, action) => {
      console.log('state', action.payload);
      state.ifbuy.companyName = action.payload.companyName;
      state.ifbuy.orderPrice = action.payload.orderPrice;
      state.ifsell.companyCode = action.payload.companyCode;
    },
    receiveSellData: (state, action) => {
      state.ifsell.companyName = action.payload.companyName;
      state.ifsell.orderPrice = action.payload.orderPrice;
      state.ifsell.companyCode = action.payload.companyCode;
    },
    receiveSetting: (state, action) => {
      state.ifopen = action.payload;
    },
    selectIdx: (state, action) => {
      state.isSelect.idx = action.payload;
    },
    change: (state, action) => {
      state.holdingdata = action.payload;
    },
    getHoldingCount: (state, action) => {
      for (let i = 0; i < action.payload.length; i += 1) {
        state.ifsell.holdingcount[i] = action.payload[i].totalCount;
      }
    },
  },
});

export const { receiveBuyData, receiveSellData, receiveSetting, selectIdx, getHoldingCount, getCompanyCodeList } =
  BuySellData.actions;
export default BuySellData;
