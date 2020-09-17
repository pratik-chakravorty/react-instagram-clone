import {
  REGISTER,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADED_SUCCESS,
  AUTH_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
  TOGGLE_SAVE,
  TOGGLE_SAVE_SUCCESS,
} from "./constants";

// auth error
export const authError = () => ({
  type: AUTH_ERROR,
});

// load user
export const loadUser = () => ({
  type: USER_LOADED,
});

export const loadUserSuccess = (payload) => ({
  type: USER_LOADED_SUCCESS,
  payload,
});

// register user
export const register = ({ fullname, username, email, password }) => ({
  type: REGISTER,
  body: { fullname, username, email, password },
});

export const registerSuccess = (payload) => ({
  type: REGISTER_SUCCESS,
  payload,
});

// login user
export const login = ({ email, password }) => ({
  type: LOGIN,
  body: { email, password },
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

// logout
export const logout = () => ({
  type: LOGOUT,
});

export const toggleSave = (id) => ({
  type: TOGGLE_SAVE,
  body: { id },
});

export const toggleSaveSuccess = (payload) => ({
  type: TOGGLE_SAVE_SUCCESS,
  payload,
});
