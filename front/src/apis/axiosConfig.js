import axios from 'axios';
import Cookies from 'js-cookie';
import StompJs from 'stompjs';
import SockJs from 'sockjs-client';
import Stomp from 'webstomp-client';

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

// 웹소켓 api
// const wsApi = axios.create();
// wsApi.defaults.baseURL = 'http://j8c106.p.ssafy.io:8188/ws';
// wsApi.defaults.baseURL = 'http://192.168.100.175:8080/ws';
// const wsApi = axios.create({
//   baseURL: 'http://j8c106.p.ssafy.io:8188/ws',
// });
// const sock = new SockJs(wsApi);
// // const sock = new SockJs('http://j8c106.p.ssafy.io:8188/ws');
// const options = {
//   debug: false,
//   protocols: Stomp.VERSIONS.supportedProtocols(),
// };
// // client 객체 생성 및 서버주소 입력
// const stomp = StompJs.over(sock, options);

export { axios, openApi, authApi };
