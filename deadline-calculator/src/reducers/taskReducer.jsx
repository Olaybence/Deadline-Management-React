import { orderTasksByDeadline, calculateSchedule } from '../algorithms/algorithms';
import { initialTasks, initialSchedule } from '../assets/data';

// Actiontypes
export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";

export const FETCH_DATA = "FETCH_DATA";
export const SAVE_DATA = "SAVE_DATA";

const initialTaskState = () => {
  // Try to load in from cache
  const loaded = loadData();
  console.log("loaded data", loaded);
  if (loaded) {
    if (!loaded.nextId) calculateNextId(loaded.tasks);
    return loaded;
  }

  // Default values
  const state = {
    /**
     * TODO: Put this into a backend (Bence: I would prefer a Java Spring + REST API)
     * List of tasks inordered.
     * It is only for storing them
     */
    tasks: initialTasks,
    nextId: 3,
    schedule: initialSchedule,
  };
  state.tasks = orderTasksByDeadline(state.tasks);
  state.schedule = calculateSchedule(state.tasks);
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
  console.log("taskReducer state", state, " action", action);
  let res = {};
  let newTasks = state.tasks;
  switch (action.type) {
    case ADD_TASK:
      newTasks.push({ ...action.task, id: state.nextId });
      res = {
        ...state,
        tasks: orderTasksByDeadline(newTasks),
        nextId: state.nextId + 1,
        schedule: calculateSchedule(newTasks),
      };
      return res;
    case REMOVE_TASK:
      newTasks.filter((item) => item.id !== action.id);
      return {
        ...state,
        tasks: orderTasksByDeadline(newTasks),
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
  console.log("save data: number of tasks:", data.tasks.length);
  if (data) {
    localStorage.setItem("initialTaskState", JSON.stringify(data));
  } else localStorage.removeItem("initialTaskState");
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
  const savedData = localStorage.getItem("initialTaskState");
  if (savedData) {
    let res = JSON.parse(savedData);
    res.map((task) => {
      let taskTemp = task;
      taskTemp.turnaroundTime = Number(task.turnaroundTime);
      return taskTemp;
    });
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
    if (task.id > nextId) nextId = task.id + 1;
  });
  return nextId;
}

export default taskReducer;