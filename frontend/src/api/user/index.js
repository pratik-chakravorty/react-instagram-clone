import axios from "axios";

export const fetchUserApi = (userName) => {
  return axios.get(`/api/users/getUser/${userName}`);
};

export const updateUserApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.put(`/api/users/update`, body, config);
};
