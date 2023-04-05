import Swal from 'sweetalert2';
import { authApi } from './axiosConfig';
import profileCondition from '../components/game/assets/ProfileConditon';

const getPossibleProfile = () => {
  return authApi
    .get('/members/profiles')
    .then((res) => {
      return res.data.permittedProfiles;
    })
    .catch((error) => {
      Swal.fire({ text: '오류가 발생했습니다.', confirmButtonColor: '#1CD6C9' });
      return error;
    });
};

const patchMyProfile = (payload) => {
  const data = {
    newProfile: payload,
  };
  return authApi
    .patch('/members/profile', data)
    .then((res) => {
      Swal.fire({ title: '프로필이 성공적으로 변경되었습니다.', confirmButtonColor: '#1CD6C9' });
      return res;
    })
    .catch((error) => {
      Swal.fire({
        title: '프로필을 변경할 수 없습니다.',
        text: `${profileCondition[payload]}`,
        confirmButtonColor: '#1CD6C9',
      });
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

const patchStateApi = () => {
  return authApi
    .patch('/members/state')
    .then((res) => {
      console.log('상태변경쓰', res);
      return res;
    })
    .catch((error) => {
      console.log('에러', error);
      return error;
    });
};

export { getPossibleProfile, patchMyProfile, patchMyNickname, patchStateApi };
