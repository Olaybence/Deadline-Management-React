import {
  orderTasksByDeadline,
  calculateSchedule,
} from "../algorithms/algorithms";
import { initialTasks } from "../assets/data";

// Actiontypes
export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";

export const FETCH_DATA = "FETCH_DATA";
export const SAVE_DATA = "SAVE_DATA";

const initialTaskState = () => {
  // Try to load in from cache
  const loaded = loadData();
  // console.log("loaded data", loaded);
  if (loaded) {
    if (!loaded.nextId) calculateNextId(loaded.tasks);
    return loaded;
  }

  const initTasksOrdered = orderTasksByDeadline(initialTasks);
  // Default values
  const state = {
    /**
     * TODO: Put this into a backend (Bence: I would prefer a Java Spring + REST API)
     * List of tasks inordered.
     * It is only for storing them
     */
    tasks: initTasksOrdered,
    nextId: calculateNextId(initialTasks),
    schedule: calculateSchedule(initTasksOrdered),
    // schedule: initialSchedule,
  };
  return state;
};

// TODO: Use Redux Toolkit for cleaner code.
// Initial use of Redux Toolkit:
// createSlice({
//   name: "task",
//   initialState: initialTaskState,
//   reducers: {
//     addTask(state, action) {
//       state.tasks.push(action.task);
//     },
//     removeTask(state, action) {
//       state.tasks.filter((item) => item.id !== action.id)
//     },
//     fetchData(state) {

//     },
//     saveData(state) {

//     },
//   }
// });

const taskReducer = (state = initialTaskState(), action) => {
  // console.log("taskReducer state", state, " action", action);
  let res = {};
  let newTasks = state.tasks;
  switch (action.type) {
    case ADD_TASK:
      newTasks.push({ ...action.task, id: state.nextId });
      newTasks = orderTasksByDeadline(newTasks);
      res = {
        ...state,
        tasks: newTasks,
        nextId: state.nextId + 1,
        schedule: calculateSchedule(newTasks),
      };
      return res;
    case REMOVE_TASK:
      newTasks = orderTasksByDeadline(
        newTasks.filter((item) => item.id !== action.id)
      );
      return {
        ...state,
        tasks: newTasks,
        schedule: calculateSchedule(newTasks),
      };
    case FETCH_DATA:
      res = {
        ...state,
        tasks: orderTasksByDeadline(newTasks.concat(action.tasks)),
      };
      return res;
    case SAVE_DATA:
      saveData(state);
      return state;
    default:
      return state;
  }
};

/**
 * Save data to local storage
 *
 * Note that if the database would be much bigger, the favorites should be saved only.
 * TODO: TEST THIS
 * - check if it saves or not.
 *  */
function saveData(data) {
  // Save data to a cookie
  // console.log("save data: number of tasks:", data.tasks.length);
  if (data) {
    localStorage.setItem("savedTaskState", JSON.stringify(data));
  } else localStorage.removeItem("savedTaskState");
}

/**
 * Retrieve data from local storage
 *
 * Note that if the database would be much bigger, the favorites should be saved only.
 * Then, this part should also remove the favorites from the all list.
 * Warning: These values are strings (turnaroundTime as well!!!)
 * TODO: TEST THIS
 * - check if it loads or not.
 * @returns {Task[]} loaded tasks from localStorage
 *  */
function loadData() {
  // Retrieve data from a cookie
  const savedData = localStorage.getItem("savedTaskState");
  // console.log("savedData", savedData);
  if (savedData) {
    let res = JSON.parse(savedData);
    // console.log("res", res);
    // res.tasks.map((task) => {
    //   let taskTemp = task;
    //   taskTemp.turnaroundTime = Number(task.turnaroundTime);
    //   return taskTemp;
    // });
    return res;
  } else return null;
}

/**
 * Search for an index that is bigger than all of existing.
 * @param {Task[]} tasks
 * @returns {Number} Next available index.
 */
function calculateNextId(tasks) {
  let nextId = 0;
  tasks.forEach((task) => {
    if (task.id >= nextId) nextId = task.id + 1;
  });
  return nextId;
}

export default taskReducer;
