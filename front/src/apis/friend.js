import axios from 'axios';

const API_URL = 'http://192.168.100.175:8080';

const friendRequest = (payload) => {
  return axios
    .post(`${API_URL}/api/members/friends/request`, payload)
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
