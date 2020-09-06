import {
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  DELETE_POST,
} from "./constants";

export const addPost = (body) => ({
  type: ADD_POST,
  body,
});

export const addPostSuccess = (payload) => ({
  type: ADD_POST_SUCCESS,
  payload,
});

export const fetchPosts = () => ({
  type: FETCH_POSTS,
});

export const fetchPostsSuccess = (payload) => ({
  type: FETCH_POSTS_SUCCESS,
  payload,
});

export const fetchPost = (id) => ({
  type: FETCH_POST,
  body: { id },
});

export const fetchPostSuccess = (payload) => ({
  type: FETCH_POST_SUCCESS,
  payload,
});

export const deletePost = (id) => ({
  type: DELETE_POST,
  id,
});

export const addComment = (body) => ({
  type: ADD_COMMENT,
  body,
});

export const addCommentSuccess = (payload) => ({
  type: ADD_COMMENT_SUCCESS,
  payload,
});
