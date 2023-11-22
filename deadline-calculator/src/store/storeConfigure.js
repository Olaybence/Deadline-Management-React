import { combineReducers, createStore } from "redux";
import taskReducer from "../reducers/taskReducer";

//TODO: Use Redux Toolkit

const store = combineReducers({
  taskReducer: taskReducer
});

export default createStore(store);