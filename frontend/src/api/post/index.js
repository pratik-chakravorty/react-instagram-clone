import axios from "axios";

export const getPostsApi = () => axios.get("/posts");
export const getPostApi = (id) => axios.get(`/post/${id}`);
export const addPostApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("/posts", body, config);
};
export const deletePostApi = (id) => axios.delete(`/post/${id}`);

export const toggleLikeApi = (id) => axios.get(`/posts/likes/${id}`);
export const toggleSaveApi = (id) => axios.get(`/posts/saves/${id}`);
export const addCommentApi = (body, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(`/posts/comment/${id}`, body, config);
};
export const deleteCommentApi = (id, commentId) =>
  axios.delete(`/posts/comment/${id}/${commentId}`);

export const searchPostApi = (searchTerm) =>
  axios.get(`/posts/search/?caption=${searchTerm}`);
