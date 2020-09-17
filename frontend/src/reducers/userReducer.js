import {
  FETCH_USERS,
  FETCH_USER,
  FETCH_USERS_SUCCESS,
  FETCH_USER_SUCCESS,
  FOLLOW,
  UNFOLLOW,
  FETCH_FEED,
  FETCH_FEED_SUCCESS,
  SEARCH_USER,
  SEARCH_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  TOGGLE_SAVE_SUCCESS,
} from "../actions/constants";

const initialState = {
  users: [],
  user: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        loading: false,
      };
    case FETCH_USERS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
