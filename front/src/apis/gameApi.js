import { axios } from './axiosConfig';

const makeRoomApi = () => {
  return axios.post('/wait-rooms');
};

const startGameApi = (payload) => {
  return axios.post('/games/init', { payload });
};

const gameDataApi = (payload) => {
  const gameData = axios.post('/games/game', { payload });
  // 데이터 넣어주기
  return gameData;
};

const resultApi = (param, payload) => {
  // return axios.get(`url${param}`, { payload });
};

export { makeRoomApi, startGameApi, gameDataApi, resultApi };
