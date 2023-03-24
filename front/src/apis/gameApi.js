import axios from 'axios';

const makeRoomApi = (payload) => {
  console.log(payload);
  return axios.post('/wait-rooms', { payload });
};

const startGameApi = (payload) => {
  return axios.post('/games/init', { payload });
};

const resultApi = (param, payload) => {
  return axios.get(`url${param}`, { payload });
};

export { makeRoomApi, startGameApi, resultApi };
