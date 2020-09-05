import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alerts: alertReducer,
});

export default rootReducer;
