import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import alertReducer from "./alertReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alerts: alertReducer,
  posts: postReducer,
  user: userReducer,
});

export default rootReducer;
