/* eslint-disable prefer-destructuring */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const API_URL = 'http://192.168.100.175:8080';

const userLogin = (payload) => {
  return axios
    .post(`${API_URL}/api/members/login`, payload)
    .then((res) => {
      console.log('로그인 성공', res.data);
      const token = res.data.accessToken;
      const refreshToken = res.data.refreshToken;

      // accessToken을 Decoding을 통해 데이터 조회
      const decodedToken = jwtDecode(token);

      Cookies.set('access_token', `Bearer ${token}`);
      Cookies.set('refresh_token', `Bearer ${refreshToken}`);
      Cookies.set('email', decodedToken.username);
      Cookies.set('id', decodedToken.id);
      Cookies.set('nickname', decodedToken.nickname);
      Cookies.set('profileIcon', decodedToken.profileIcon);
      return true;
      // 로그인 성공했을 때 쿠키에 데이터 저장
    })
    .catch((err) => {
      console.log('로그인 실패', err);
      return err.response.data.message;
    });
};

const userSignup = (payload) => {
  return axios
    .post(`${API_URL}/api/members/signup`, payload)
    .then((res) => {
      console.log('회원가입 성공', res);
      return true;
    })
    .catch((err) => {
      console.log('회원가입 실패', err);
      return err.response.data.message;
    });
};

export { userLogin, userSignup };
