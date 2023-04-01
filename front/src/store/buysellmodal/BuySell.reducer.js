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
      holdingcount: {},
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
      const count = [];
      for (let i = 0; i < action.payload.length; i += 1) {
        const tmp = { [action.payload[i]]: 0 };
        console.log(tmp, 'tmp');
        count.push(tmp);
      }
      state.ifsell.holdingcount = count;
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
      console.log('여기옴?', action.payload);
      state.ifsell.holdingcount = [];
      for (let i = 0; i < action.payload.length; i += 1) {
        console.log(action.payload[i].totalCount, '이게뭔데');
        const tmp = { [action.payload[i].companyCode]: action.payload[i].totalCount };
        state.ifsell.holdingcount.push(tmp);
      }
    },
  },
});

export const { receiveBuyData, receiveSellData, receiveSetting, selectIdx, getHoldingCount, getCompanyCodeList } =
  BuySellData.actions;
export default BuySellData;
