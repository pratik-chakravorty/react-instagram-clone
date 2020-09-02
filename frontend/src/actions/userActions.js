import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FOLLOW,
  UNFOLLOW,
  FETCH_FEED,
  FETCH_FEED_SUCCESS,
  SEARCH_USER,
  SEARCH_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
} from "./constants";

export const fetchUsers = () => ({
  type: FETCH_USERS,
});

export const fetchUserSuccess = (payload) => ({
  type: FETCH_USERS_SUCCESS,
  payload,
});

export const followUser = () => ({
  type: FOLLOW,
});

export const unfollowUser = () => ({
  type: UNFOLLOW,
});

export const fetchFeed = () => ({
  type: FETCH_FEED,
});

export const fetchFeedSuccess = (payload) => ({
  type: FETCH_FEED_SUCCESS,
  payload,
});

export const searchUser = () => ({
  type: SEARCH_USER,
});

export const searchUserSuccess = (payload) => ({
  type: SEARCH_USER_SUCCESS,
});

export const updateUser = (id) => ({
  type: UPDATE_USER,
  body: { id },
});

export const updateUserSuccess = (payload) => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});