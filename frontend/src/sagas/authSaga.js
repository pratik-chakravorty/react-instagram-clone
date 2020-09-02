import { takeLatest, call, put, all } from "redux-saga/effects";
import { v4 } from "uuid";
import { REGISTER, USER_LOADED, LOGIN } from "../actions/constants";

import { registerApi, loginApi, loadUserApi } from "../api/auth";

import {
  loadUser,
  loadUserSuccess,
  registerSuccess,
  loginSuccess,
  authError,
} from "../actions/authActions";

import { setAlert } from "../actions/alertActions";

function* registerUserSaga(action) {
  const body = action.body;
  try {
    const { data } = yield call(registerApi, body);
    yield put(registerSuccess(data));
    yield put(loadUser());
    yield put(
      setAlert(`User has been registered and logged in`, "success", {
        id: v4(),
      })
    );
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) => put(setAlert(error.msg, "error", { id: v4() })))
      );
    }
  }
}

function* loginUserSaga(action) {
  const body = action.body;
  try {
    const { data } = yield call(loginApi, body);
    yield put(loginSuccess(data));
    yield put(loadUser());
    yield put(
      setAlert(`User has been logged in`, "success", {
        id: v4(),
      })
    );
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) => put(setAlert(error.msg, "error", { id: v4() })))
      );
    }
  }
}

function* userLoadedSaga() {
  try {
    const { data } = yield call(loadUserApi);
    yield put(loadUserSuccess(data));
  } catch (e) {
    yield put(authError());
  }
}

function* authSagas() {
  yield takeLatest(REGISTER, registerUserSaga);
  yield takeLatest(LOGIN, loginUserSaga);
  yield takeLatest(USER_LOADED, userLoadedSaga);
}

export default authSagas;
