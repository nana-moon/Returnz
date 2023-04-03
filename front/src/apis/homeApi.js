import { axios } from './axiosConfig';

const getTodayWord = () => {
  return axios
    .get('/today-words')
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

const getTopTenRank = () => {
  return axios
    .get('/user-ranks')
    .then((res) => {
      console.log(res, '탑텐유저겟성공');
      return res.data.userRank;
    })
    .catch((error) => {
      console.log(error, '탑텐유저실패');
      return error;
    });
};

export { getTodayWord, getTopTenRank };
