import { removeAlert } from "../actions/alertActions";
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
  ADD_POST,
  FETCH_POSTS,
  FETCH_POST,
  DELETE_POST,
  SET_ALERT,
  FETCH_USER,
} from "../actions/constants";
import setAuthToken from "../utils/setAuthToken";

export const retrieveLocalStorageTokenMiddleware = (_) => (next) => (
  action
) => {
  let tokenNeededActions = [
    USER_LOADED,
    ADD_POST,
    FETCH_USER,
    FETCH_POST,
    FETCH_POSTS,
    DELETE_POST,
  ];
  if (localStorage.token && tokenNeededActions.includes(action.type)) {
    setAuthToken(localStorage.token);
  }
  next(action);
};

export const setLocalStorageMiddleware = (_) => (next) => (action) => {
  if (action.type === REGISTER_SUCCESS || action.type === LOGIN_SUCCESS) {
    localStorage.setItem("token", action.payload.token);
  }
  next(action);
};

export const removeLocalStorageMiddleware = (_) => (next) => (action) => {
  if (action.type === LOGOUT) {
    localStorage.removeItem("token");
  }
  next(action);
};

export const removeAlertMiddleware = (store) => (next) => (action) => {
  if (action.type === SET_ALERT && !action.payload.mode) {
    // Set timer for 2 seconds and then remove the alert.
    setTimeout(() => {
      store.dispatch(removeAlert(action.payload.id));
    }, 2000);
  }
  next(action);
};
