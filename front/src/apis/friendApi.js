import { axios } from './axiosConfig';

const friendRequest = (payload) => {
  return axios
    .post('members/friends/request', payload)
    .then((res) => {
      console.log('친구신청 성공', res);
      return res;
    })
    .catch((err) => {
      console.log('친구신청 실패', err);
      return err;
    });
};

export { friendRequest };
