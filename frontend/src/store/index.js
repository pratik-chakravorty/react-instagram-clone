import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import rootReducer from "../reducers";
import {
  setLocalStorageMiddleware,
  retrieveLocalStorageTokenMiddleware,
  removeLocalStorageMiddleware,
  removeAlertMiddleware,
} from "../middlewares";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
  setLocalStorageMiddleware,
  removeLocalStorageMiddleware,
  retrieveLocalStorageTokenMiddleware,
  removeAlertMiddleware,
];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
