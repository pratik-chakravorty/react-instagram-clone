import { takeLatest, call, put, all } from "redux-saga/effects";
import { v4 } from "uuid";
import {
  FETCH_USERS,
  FETCH_USER,
  FETCH_USERS_SUCCESS,
  FOLLOW,
  UNFOLLOW,
  FETCH_FEED,
  FETCH_FEED_SUCCESS,
  SEARCH_USER,
  SEARCH_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
} from "../actions/constants";
import {
  fetchUsersSuccess,
  fetchUserSuccess,
  fetchFeedSuccess,
  searchUserSuccess,
  updateUserSuccess,
} from "../actions/userActions";

import { fetchUserApi, updateUserApi } from "../api/user";
import { setAlert } from "../actions/alertActions";

function* fetchUserSaga(action) {
  try {
    const { userName } = action.body;
    const { data } = yield call(fetchUserApi, userName);
    yield put(fetchUserSuccess(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) => put(setAlert(error.msg, "error", { id: v4() })))
      );
    }
  }
}

function* updateUserSaga(action) {
  try {
    const { data } = yield call(updateUserApi, action.body);
    yield put(fetchUserSuccess(data));
    yield put(setAlert("User profile updated", "success", { id: v4() }));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) => put(setAlert(error.msg, "error", { id: v4() })))
      );
    }
  }
}
function* userSaga() {
  yield takeLatest(FETCH_USER, fetchUserSaga);
  yield takeLatest(UPDATE_USER, updateUserSaga);
  //   yield takeLatest(FETCH_USERS, fetchUsersSaga);
}

export default userSaga;
