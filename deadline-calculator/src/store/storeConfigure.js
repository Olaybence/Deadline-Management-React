import { combineReducers, createStore } from "redux";
import taskReducer from "../reducers/taskReducer";
import scheduleReducer from "../reducers/scheduleReducer";

const store = combineReducers({
  taskReducer: taskReducer,
  scheduleReducer: scheduleReducer
});

export default createStore(store);


// const taskSubscriber = () => {
//   console.log("taskSubscriber getState:", store.getState());
// };

// store.subscribe(taskSubscriber());