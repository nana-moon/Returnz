/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const waitRoom = createSlice({
  name: 'waitRoom',
  initialState: {
    roomId: null,
    captainName: null,
    waiterList: [],
  },
  reducers: {
    setWaitRoomId(state, action) {
      state.roomId = action.payload;
    },
    setCaptainName(state, action) {
      state.captainName = action.payload;
    },
    setWaiterList(state, action) {
      state.waiterList.push(action.payload);
    },
    removeWaiterList(state, action) {
      state.waiterList = [];
    },
  },
});

export const { setWaitRoomId, setCaptainName, setWaiterList, removeWaiterList } = waitRoom.actions;
export default waitRoom;
