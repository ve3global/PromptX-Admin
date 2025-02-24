import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import settingReducer from "./settingReducer";
import userReducer from "./userreducer";

const allReducers = combineReducers({
  counter: counterReducer,
  settings: settingReducer,
  user: userReducer,
});

export default allReducers;
