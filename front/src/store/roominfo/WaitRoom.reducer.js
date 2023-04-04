/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: null,
  hostNickname: null,
  waiterList: [],
  setting: {
    theme: null,
    turnPerTime: 'NO',
    startTime: null,
    totalTurn: null,
    memberIdList: [],
  },
};

export const waitRoom = createSlice({
  name: 'waitRoom',
  initialState,
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
    resetWaitRoom(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setWaitRoomId, setHostNickname, setWaiterList, removeWaiterList } = waitRoom.actions;
export default waitRoom;
