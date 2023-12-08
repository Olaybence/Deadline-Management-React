import {
  calculateSchedule,
} from "../algorithms/algorithms";
import { initialTasks } from "../assets/data";
import { Schedule, State, Task } from "../assets/models";

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
    return loaded;
  }

  const initTasksOrdered = Task.orderTasksByTag(initialTasks,Task.TAG_DEADLINE);
  // Default values
  const state = new State(
    /**
     * TODO: Put this into a backend (Bence: I would prefer a Java Spring + REST API)
     * List of tasks inordered.
     * It is only for storing them
     */
    initTasksOrdered,
    0,
    calculateSchedule(initTasksOrdered),
    // [],
  );
  console.log("state", state);
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

const taskReducer = (state: State = initialTaskState(), action: any): State => {
  console.log("taskReducer state", state, " action", action);
  let newTasks = state.tasks;
  let newState;
  switch (action.type) {
    case ADD_TASK:
      const newTask = new Task(
        action.task.id,
        action.task.name,
        action.task.priority,
        action.task.deadline,
        action.task.turnaroundTime
      );
      newTasks.push(newTask);
      console.log()
      newTasks = Task.orderTasksByTag(newTasks,Task.TAG_DEADLINE);

      newState = new State(newTasks,
        state.nextId + 1,
        calculateSchedule(newTasks),
      );
      console.log("newState", newState);
      return newState;
    case REMOVE_TASK:
      newTasks = Task.orderTasksByTag(
        newTasks.filter((item: Task) => item.id !== action.id),
        Task.TAG_DEADLINE
      );
      
      newState = new State(newTasks, state.nextId, calculateSchedule(newTasks));
      console.log("newState", newState);
      return newState;
    case FETCH_DATA:
      const fetchedState = fetchData();
      
      newState = fetchedState ? fetchedState : new State([],0,[]);
      console.log("newState", newState);
      return newState;
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
function saveData(state: State) {
  // Save data to a cookie
  console.log("save data:", state);
  if (state) {
    localStorage.setItem("savedTaskState", JSON.stringify(state));
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
    res.tasks = res.tasks.map((taskRaw: any) => {
      let task: Task = new Task(
        taskRaw.id,
        taskRaw.name,
        taskRaw.priority,
        taskRaw.deadline,
        taskRaw.turnaroundTime
      );
      return task;
    });
    res.nextId = calculateNextId(res.tasks);
    res.schedule = calculateSchedule(res.tasks);
    return new State(res.tasks, res?.nextId, res.schedule);
  } else return null;
}

function fetchData() {
  return loadData();
}

/**
 * Search for an index that is bigger than all of existing.
 * @param {Task[]} tasks
 * @returns {Number} Next available index.
 */
function calculateNextId(tasks: Task[]) {
  let nextId = 0;
  tasks.forEach((task) => {
    if (task.id >= nextId) nextId = task.id + 1;
  });
  return nextId;
}

export default taskReducer;
