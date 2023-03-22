import axios from 'axios';

const BASE_URL = 'https://localhost:8080/api';

// 로그인 전 사용할 api
axios.defaults.baseURL = BASE_URL;

// 로그인 후 사용할 api
const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.interceptors.request.use(
  (request) => {
    const AUTH_TOKEN = '';
    request.headers.common.Authorization = AUTH_TOKEN;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 금리, 환율 요청 시 사용할 api
const openApi = axios.create();
openApi.defaults.baseURL = 'http://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/api';

export { authApi, openApi };
