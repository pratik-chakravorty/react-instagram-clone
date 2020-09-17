import axios from "axios";

// register api
export const registerApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("/api/auth/register", body, config);
};

// login api
export const loginApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("/api/auth/login", body, config);
};

// get current user
export const loadUserApi = () => axios.get("/api/auth/me");

export const toggleSaveApi = (id) => axios.get(`/api/posts/saves/${id}`);
