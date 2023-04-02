/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const gameRoom = createSlice({
  name: 'gameRoom',
  initialState: {
    id: null,
    roomId: null,
    hostNickname: null,
    gamerId: null,
    playerList: [],
  },
  reducers: {
    setGameId(state, action) {
      state.id = action.payload;
    },
    setGameRoomId(state, action) {
      state.roomId = action.payload;
    },
    setHostNickname(state, action) {
      state.hostNickname = action.payload;
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

export const { setGameId, setGameRoomId, setHostNickname, setGamerId, setPlayerList, removePlayerList } =
  gameRoom.actions;
export default gameRoom;
