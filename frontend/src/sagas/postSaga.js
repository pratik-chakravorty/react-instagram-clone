import { takeLatest, call, put, all } from "redux-saga/effects";
import { v4 } from "uuid";
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
  TOGGLE_LIKE,
} from "../actions/constants";

import {
  fetchPosts,
  addPostSuccess,
  fetchPostsSuccess,
  fetchPostSuccess,
  deletePost,
  deletePostSuccess,
  addCommentSuccess,
  toggleLikeSuccess,
} from "../actions/postActions";

import {
  getPostsApi,
  getPostApi,
  addPostApi,
  deletePostApi,
  toggleLikeApi,
  toggleSaveApi,
  addCommentApi,
  deleteCommentApi,
  searchPostApi,
} from "../api/post";
import { setAlert } from "../actions/alertActions";

function* fetchPostSaga(action) {
  try {
    const { data } = yield call(getPostApi);
    yield put(fetchPostSuccess(data));
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) => put(setAlert(error.msg, "error", { id: v4() })))
      );
    }
  }
}
function* fetchPostsSaga() {
  try {
    const { data } = yield call(getPostsApi);
    yield put(fetchPostsSuccess(data));
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) => put(setAlert(error.msg, "error", { id: v4() })))
      );
    }
  }
}
function* addPostSaga(action) {
  try {
    const { data } = yield call(addPostApi, action.body);
    yield put(addPostSuccess(data));
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) => put(setAlert(error.msg, "error", { id: v4() })))
      );
    }
  }
}
function* deletePostSaga(action) {
  try {
    yield call(deletePostApi, action.body);
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) => put(setAlert(error.msg, "error", { id: v4() })))
      );
    }
  }
}
function* addCommentSaga(action) {
  try {
    const { data } = yield call(addCommentApi, action.body);
    console.log("comment data", data);
    yield put(addCommentSuccess(data.data));
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) => put(setAlert(error.msg, "error", { id: v4() })))
      );
    }
  }
}

function* toggleLikeSaga(action) {
  try {
    const { data } = yield call(toggleLikeApi, action.body.id);
    yield put(toggleLikeSuccess({ id: action.body.id, likes: data.likes }));
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) => put(setAlert(error.msg, "error", { id: v4() })))
      );
    }
  }
}

function* postSaga() {
  yield takeLatest(FETCH_POST, fetchPostSaga);
  yield takeLatest(FETCH_POSTS, fetchPostsSaga);
  yield takeLatest(ADD_POST, addPostSaga);
  yield takeLatest(DELETE_POST, deletePostSaga);
  yield takeLatest(ADD_COMMENT, addCommentSaga);
  yield takeLatest(TOGGLE_LIKE, toggleLikeSaga);
}

export default postSaga;
