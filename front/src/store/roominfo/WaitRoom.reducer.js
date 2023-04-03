/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const waitRoom = createSlice({
  name: 'waitRoom',
  initialState: {
    roomId: null,
    hostNickname: null,
    waiterList: [],
  },
  reducers: {
    setWaitRoomId(state, action) {
      state.roomId = action.payload;
    },
    setHostNickname(state, action) {
      state.hostNickname = action.payload;
    },
    setWaiterList(state, action) {
      state.waiterList.push(action.payload);
    },
    removeWaiterList(state, action) {
      state.waiterList = [];
    },
  },
});

export const { setWaitRoomId, setHostNickname, setWaiterList, removeWaiterList } = waitRoom.actions;
export default waitRoom;
