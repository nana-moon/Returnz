/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const gameRoom = createSlice({
  name: 'gameRoom',
  initialState: {
    roomId: null,
    captainName: null,
    gamerId: null,
    playerList: [],
  },
  reducers: {
    setGameRoomId(state, action) {
      state.roomId = action.payload;
    },
    setCaptainName(state, action) {
      state.captainName = action.payload;
    },
    setGamerId(state, action) {
      state.gamerId = action.payload;
    },
    setPlayerList(state, action) {
      state.playerList = action.payload;
    },
    removePlayerList(state, action) {
      state.playerList = [];
    },
  },
});

export const { setGameRoomId, setCaptainName, setGamerId, setPlayerList, removePlayerList } = gameRoom.actions;
export default gameRoom;
