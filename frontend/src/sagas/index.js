import authSaga from "./authSaga";

import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([authSaga()]);
}

export default rootSaga;
