/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  roomId: null,
  hostNickname: null,
  gamerId: null,
  playerList: [], // deposit, gamerId, memberId, originDeposit, totalEvaluationAsset, totalEvaluationStock, totalProfitRate, totalPurchaseAmount, userName, userProfileIcon
  isReadyList: [], // username
};

export const gameRoom = createSlice({
  name: 'gameRoom',
  initialState,
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
      const newPlayerList = Object.values(action.payload);
      const readyList = newPlayerList.map((player) => {
        return { username: player.userName, status: false };
      });
      state.isReadyList = readyList;
      state.playerList = newPlayerList;
    },
    setInitIsReadyList(state, action) {
      state.initIsReadyList = action.payload;
    },
    setIsReadyList(state, action) {
      state.isReadyList = action.payload;
    },
    resetIsReadyList(state, action) {
      console.log('initIsReadyList', state.initIsReadyList);
      state.isReadyList = state.initIsReadyList;
    },
    resetGameRoom(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setGameId,
  setGameRoomId,
  setHostNickname,
  setGamerId,
  setPlayerList,
  setInitIsReadyList,
  setIsReadyList,
  resetIsReadyList,
  resetGameRoom,
} = gameRoom.actions;
export default gameRoom;
