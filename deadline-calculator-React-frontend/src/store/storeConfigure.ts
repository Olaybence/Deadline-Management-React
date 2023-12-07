import { createStore } from "redux";
import taskReducer from "../reducers/taskReducer";

//TODO: Use Redux Toolkit

const store = createStore(taskReducer);

export default store;