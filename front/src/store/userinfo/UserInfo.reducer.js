/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const userInfo = createSlice({
  name: 'userInfo',
  initialState: {
    roomId: null,
    gameId: null,
    isHost: false,
  },
  reducers: {
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

export const { setRoomId, setGameId, setIsHost } = userInfo.actions;
export default userInfo;
