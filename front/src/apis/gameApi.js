import { axios } from './axiosConfig';

const makeRoomApi = () => {
  console.log('---------------');
  return axios.post('/wait-rooms');
};

const startGameApi = async (payload) => {
  console.log(payload, '코비드 전달값');
  const res = await axios.post('/games/init', payload);
  console.log(res);
  return res;
};

const gameDataApi = (payload) => {
  const gameData = axios.post('/games/game', payload);
  console.log(gameData);
  // 데이터 넣어주기
  return gameData;
};

const resultApi = (param, payload) => {
  // return axios.get(`url${param}`, { payload });
};

export { makeRoomApi, startGameApi, gameDataApi, resultApi };
