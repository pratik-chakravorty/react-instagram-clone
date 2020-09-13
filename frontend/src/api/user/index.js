import axios from "axios";

export const fetchUserApi = (userName) => {
  return axios.get(`/api/users/getUser/${userName}`);
};

export const fetchUsersApi = () => {
  return axios.get(`/api/users/getUsers/`);
};

export const followUser = (id) => {
  return axios.get(`/api/users/follow/${id}`);
};

export const unFollowUser = (id) => {
  return axios.get(`/api/users/unfollow/${id}`);
};
export const updateUserApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.put(`/api/users/update`, body, config);
};

export const fetchUserFeed = () => {
  return axios.get(`/api/users/feed`);
};

export const searchUserApi = (params) => {
  return axios.get(`/api/users/search`, { params: { ...params } });
};
