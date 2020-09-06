import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import alertReducer from "./alertReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alerts: alertReducer,
  posts: postReducer,
});

export default rootReducer;
