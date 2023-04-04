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
      return res.data.userRank;
    })
    .catch((error) => {
      return error;
    });
};

const getRecommendedStock = () => {
  return axios
    .get('/recommend-stock')
    .then((res) => {
      console.log('추천주식', res.data);
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export { getTodayWord, getTopTenRank, getRecommendedStock };
