import { authApi } from './axiosConfig';

const getFriendRequests = () => {
  return authApi
    .get('requests')
    .then((res) => {
      console.log(res.data.friendRequestList);
      return res.data.friendRequestList;
    })
    .catch((err) => {
      return err;
    });
};

export { getFriendRequests };
