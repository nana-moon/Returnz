import { authApi } from './axiosConfig';

const getFriendRequests = () => {
  return authApi
    .get('requests')
    .then((res) => {
      console.log('친구리스트겟 성공', res);
      return res;
    })
    .catch((err) => {
      console.log('친구리스트겟 실패', err);
      return err;
    });
};

export { getFriendRequests };
