import axios from 'axios';
import Cookies from 'js-cookie';

// 로그인된 사용자
const BASE_URL = 'http://j8c106.p.ssafy.io/api';
axios.defaults.baseURL = BASE_URL;

const authApi = axios.create({
  baseURL: BASE_URL,
});

authApi.interceptors.request.use(
  (request) => {
    const ACCESS_TOKEN = Cookies.get('access_token');
    request.headers.Authorization = ACCESS_TOKEN || null;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 금리, 환율 요청 시 사용할 api
const openApi = axios.create({
  baseURL: 'https://www.alphavantage.co/',
});

export { axios, openApi, authApi };
