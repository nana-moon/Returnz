/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const test = createSlice({
  name: 'test',
  initialState: {
    tmpdata: {
      data1: 1,
      data2: 2,
      data3: 3,
    },
    dummy: {
      data4: '',
      data5: '',
      data6: '',
    },
  },
  reducers: {
    test1(state, action) {
      // 여기서 api 함수 임포트해서 axios요청 가능
      state.tmpdata.data1 = action.payload;
    },
    test2(state, action) {
      state.dummy = action.payload;
    },
  },
});

export const { test1, test2 } = test.actions;
export default test;
