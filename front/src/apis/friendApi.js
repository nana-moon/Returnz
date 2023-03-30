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

const acceptFriendRequestApi = (payload) => {
  return authApi
    .post(`/friends/${payload}`)
    .then((res) => {
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
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export { getFriendRequestsApi, acceptFriendRequestApi, declineFriendRequestApi };
