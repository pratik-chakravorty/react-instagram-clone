import { createStore, applyMiddleware } from "redux";
import { composeWithDevtools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import rootReducer from "./reducers";
import {
  setLocalStorageMiddleware,
  removeLocalStorageMiddleware,
  removeAlertMiddleware,
  setLocalStorageTokenMiddleware,
  retrieveLocalStorageTokenMiddleware,
} from "./middlewares";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
  setLocalStorageMiddleware,
  removeLocalStorageMiddleware,
  removeAlertMiddleware,
];

const store = createStore(
  rootReducer,
  composeWithDevtools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
