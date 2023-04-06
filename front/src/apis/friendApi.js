import Swal from 'sweetalert2';
import { authApi } from './axiosConfig';

const getFriendRequestsApi = () => {
  return authApi
    .get('requests')
    .then((res) => {
      return res.data.friendRequestList;
    })
    .catch((err) => {
      return err;
    });
};
const sendFriendRequestApi = (payload) => {
  return authApi
    .post(`/requests`, payload)
    .then((res) => {
      Swal.fire({ title: '친구요청 완료', confirmButtonColor: '#1CD6C9' });
      return res;
    })
    .catch((err) => {
      Swal.fire({ title: '해당 유저가 존재하지 않습니다.', confirmButtonColor: '#1CD6C9' });
      return err;
    });
};

const acceptFriendRequestApi = (payload) => {
  const data = payload.requestId;
  return authApi
    .post(`/friends/${data}`)
    .then((res) => {
      Swal.fire({
        title: '🎉축하합니다🎉',
        html: `<b>${payload.nickname}</b> + 와 친구가 되었습니다!`,
        confirmButtonColor: '#1CD6C9',
      });
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const declineFriendRequestApi = (payload) => {
  return authApi
    .delete(`/requests/${payload}`)
    .then((res) => {
      Swal.fire({
        html: '친구요청을 삭제했습니다.',
        confirmButtonColor: '#1CD6C9',
      });
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const acceptInviteRequestApi = (payload) => {
  return authApi
    .post(`/wait-room/waiter?roomId=${payload}`)
    .then((res) => {
      console.log(res, '자, 대기방 들가자~~~');
      return res;
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        html: '게임을 찾을 수 없습니다.',
        confirmButtonColor: '#1CD6C9',
      });
      return err;
    });
};

const deleteFriendApi = (payload) => {
  return authApi
    .delete(`/friends?username=${payload}`)
    .then((res) => {
      Swal.fire({ title: '친구삭제 완료', confirmButtonColor: '#1CD6C9' });
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export {
  getFriendRequestsApi,
  sendFriendRequestApi,
  acceptFriendRequestApi,
  declineFriendRequestApi,
  acceptInviteRequestApi,
  deleteFriendApi,
};
