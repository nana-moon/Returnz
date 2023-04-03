import Swal from 'sweetalert2';
import { authApi } from './axiosConfig';

const getPossibleProfile = () => {
  return authApi
    .get('/members/profiles')
    .then((res) => {
      console.log(res.data);
      return res.data.permittedProfiles;
    })
    .catch((error) => {
      console.log(error, '프사들후보...에러');
      return error;
    });
};

const patchMyProfile = (payload) => {
  console.log(payload);
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
      Swal.fire({ text: '닉네임이 성공적으로 변경되었습니다.', confirmButtonColor: '#1CD6C9' });
      return res;
    })
    .catch((error) => {
      Swal.fire({ text: '해당 닉네임은 사용하실 수 없습니다.', confirmButtonColor: '#1CD6C9' });
      return error;
    });
};

export { getPossibleProfile, patchMyProfile, patchMyNickname };
