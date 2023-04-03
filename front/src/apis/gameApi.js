import { axios, authApi } from './axiosConfig';

const makeRoomApi = async () => {
  return authApi
    .post('/wait-room')
    .then((res) => {
      console.log('방만들기 성공', res);
      return res.data;
    })
    .catch((err) => {
      console.log('방만들기 실패', err);
      return err;
    });
};

const startGameApi = async (payload) => {
  console.log(payload, 'payload');
  const res = await authApi.post('/games/init', payload);
  return res.data;
};

const gameDataApi = (payload) => {
  return authApi
    .post('/games/game', payload)
    .then((res) => {
      console.log('데이터 가져오기 성공', res);
      return res.data;
    })
    .catch((err) => {
      console.log('데이터 가져오기 실패', err);
      return err;
    });
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

const resultApi = (param, payload) => {
  // return axios.get(`url${param}`, { payload });
};

export { makeRoomApi, startGameApi, gameDataApi, resultApi, buyStockApi, sellStockApi, getNewsApi };
