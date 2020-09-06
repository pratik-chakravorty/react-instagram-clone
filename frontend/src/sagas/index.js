import authSaga from "./authSaga";
import postSaga from "./postSaga";
import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([authSaga(), postSaga()]);
}

export default rootSaga;
