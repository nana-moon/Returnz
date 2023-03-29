import Cookies from 'js-cookie';
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
  const res = await axios.post('/games/init', payload);
  console.log(res.data);
  // 나인지 확인하고 roomId, gameId 저장하기
  const myNickname = Cookies.get('nickname');
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
