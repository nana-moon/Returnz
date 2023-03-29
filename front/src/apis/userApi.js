import { authApi } from './axiosConfig';

const getPossibleProfile = () => {
  return authApi
    .get('/members/profile')
    .then((res) => {
      console.log(res, '내프사들후보여');
      return res;
    })
    .catch((error) => {
      console.log(error, '프사들후보...에러');
      return error;
    });
};

const patchMyProfile = (payload) => {
  return authApi
    .patch('/members/profile', payload)
    .then((res) => {
      console.log(res, '내프사수정');
      return res;
    })
    .catch((error) => {
      console.log(error, '프사수정실패여');
      return error;
    });
};

const patchMyNickname = (payload) => {
  return authApi
    .patch('/members/nickname', payload)
    .then((res) => {
      console.log(res, '닉수정성공');
      return res;
    })
    .catch((error) => {
      console.log(error, '닉수정실패여');
      return error;
    });
};

export { getPossibleProfile, patchMyProfile, patchMyNickname };
