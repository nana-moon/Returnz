/* eslint-disable prefer-destructuring */
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { axios } from './axiosConfig';

const userLogin = (payload) => {
  return axios
    .post('members/login', payload)
    .then((res) => {
      const token = res.data.accessToken;
      const refreshToken = res.data.refreshToken;

      // accessToken을 Decoding을 통해 데이터 조회
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
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
      return err.response.data.message;
    });
};

const userSignup = (payload) => {
  return axios
    .post('members/signup', payload)
    .then((res) => {
      return true;
    })
    .catch((err) => {
      return err.response.data.message;
    });
};

export { userLogin, userSignup };
