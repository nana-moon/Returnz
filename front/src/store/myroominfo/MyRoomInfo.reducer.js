/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const myRoomInfo = createSlice({
  name: 'myRoomInfo',
  initialState: {
    roomInfo: null,
    roomId: null,
    gameId: null,
    isHost: false,
  },
  reducers: {
    setRoomInfo(state, action) {
      state.roomInfo = action.payload;
    },
    setRoomId(state, action) {
      state.roomId = action.payload;
    },
    setGameId(state, action) {
      state.gameId = action.payload;
    },
    setIsHost(state, action) {
      state.isHost = action.payload;
    },
  },
});

export const { setRoomInfo, setRoomId, setGameId, setIsHost } = myRoomInfo.actions;
export default myRoomInfo;
