/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const gameRoom = createSlice({
  name: 'gameRoom',
  initialState: {
    id: null,
    roomId: null,
    hostNickname: null,
    gamerId: null,
    playerList: [], // profileIcon, nickname, gamerId, username
    isReadyList: [false, false, false, false],
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
    setReady(state, action) {
      state.playerList[action.payload.idx].isReady = true;
    },
    setIsReadyList(state, action) {
      state.isReadyList = action.payload;
    },
  },
});

export const {
  setGameId,
  setGameRoomId,
  setHostNickname,
  setGamerId,
  setPlayerList,
  removePlayerList,
  setReady,
  setIsReadyList,
} = gameRoom.actions;
export default gameRoom;
