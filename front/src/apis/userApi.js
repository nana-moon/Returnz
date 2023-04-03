import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { authApi } from './axiosConfig';

const getPossibleProfile = () => {
  return authApi
    .get('/members/profiles')
    .then((res) => {
      console.log(res.data);
      return res.data.permittedProfiles;
    })
    .catch((error) => {
      Swal.fire({ text: '오류가 발생했습니다.', confirmButtonColor: '#1CD6C9' });
      return error;
    });
};

const patchMyProfile = (payload) => {
  console.log(payload);
  return authApi
    .patch('/members/profile', payload)
    .then((res) => {
      Swal.fire({ text: '프로필이 성공적으로 변경되었습니다.', confirmButtonColor: '#1CD6C9' });
      console.log(res, 'ggg');
      return res;
    })
    .catch((error) => {
      Swal.fire({ text: '오류가 발생했습니다.', confirmButtonColor: '#1CD6C9' });
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
