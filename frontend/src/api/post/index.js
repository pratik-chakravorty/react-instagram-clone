import axios from "axios";

export const getPostsApi = () => axios.get("/api/posts");
export const getPostApi = (id) => axios.get(`/api/post/${id}`);
export const addPostApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("/api/posts", body, config);
};
export const deletePostApi = (id) => axios.delete(`/api/post/${id}`);

export const toggleLikeApi = (id) => axios.get(`/api/posts/likes/${id}`);
export const toggleSaveApi = (id) => axios.get(`/api/posts/saves/${id}`);
export const addCommentApi = ({ id, text }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(`/api/posts/comment/${id}`, { text }, config);
};
export const deleteCommentApi = (id, commentId) =>
  axios.delete(`/api/posts/comment/${id}/${commentId}`);

export const searchPostApi = (searchTerm) =>
  axios.get(`/api/posts/search/?caption=${searchTerm}`);
