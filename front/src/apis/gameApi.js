import { axios, authApi } from './axiosConfig';

const makeRoomApi = async () => {
  return authApi
    .post('/wait-room')
    .then((res) => {
      // console.log('makeRoomApi from gameApi', res.data);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

const startGameApi = async (payload) => {
  console.log('startGameApi', payload);
  const res = await authApi.post('/games/init', payload);
  return res.data;
};

const gameDataApi = (payload) => {
  console.log('gameDataApi Payload -------', payload);
  return authApi
    .post('/games/game', payload)
    .then((res) => {
      console.log(res.data.gamer, 'resdata!!@@');
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

const serverTimeApi = async (payload) => {
  console.log('roomId', payload);
  const abc = await authApi.get(`/server-time?roomId=${payload}`);
  console.log('servertime', abc);
};

const buyStockApi = (payload) => {
  return axios
    .post('/games/purchases', payload)
    .then((res) => {
      console.log('매수 성공', res);
      return res.data;
    })
    .catch((err) => {
      console.log('매수 실패', err);
      return false;
    });
};

const sellStockApi = (payload) => {
  return axios
    .post('/games/sales', payload)
    .then((res) => {
      console.log('매도 성공', res);
      return res.data;
    })
    .catch((err) => {
      console.log('매도 실패', err);
      return false;
    });
};

const getNewsApi = (payload) => {
  return authApi
    .post('/news', payload)
    .then((res) => {
      // console.log('뉴스가져오기 성공', res);
      return res.data;
    })
    .catch((err) => {
      console.log('뉴스가져오기 실패', err);
      return false;
    });
};

const resultApi = async (payload) => {
  return axios
    .post('/results', payload)
    .then((res) => {
      // console.log('결과 받아오기 성공', res);
      return res.data;
    })
    .catch((err) => {
      console.log('결과 받아오기 실패', err);
      return false;
    });
};

export { makeRoomApi, startGameApi, gameDataApi, serverTimeApi, resultApi, buyStockApi, sellStockApi, getNewsApi };
