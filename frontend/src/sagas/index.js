import authSaga from "./authSaga";
import postSaga from "./postSaga";
import userSaga from "./userSaga";
import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([authSaga(), postSaga(), userSaga()]);
}

export default rootSaga;
