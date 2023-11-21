import {
  ADD_TASK,
  FETCH_DATA,
  REMOVE_TASK,
  SAVE_DATA,
} from "../actions/taskActions";

const initialTaskState = () => {
  // Try to load in from cache
  // const loaded = loadData();
  // console.log("loaded data", loaded);
  // if (loaded) return loaded;

  // Default values
  return {
    /**
     * List of tasks inordered.
     * It is only for storing them
     */
    tasks: [
      {
        name: "Project phase 3",
        turnaroundTime: 10,
        deadline: "2023-11-30",
        collision: false,
        id: 0,
      },
      {
        name: "Project phase 1",
        turnaroundTime: 7,
        deadline: "2023-11-23",
        id: 1,
      },
      {
        name: "Project phase 2",
        turnaroundTime: 12,
        deadline: "2023-11-25",
        id: 2,
      },
    ],
    nextId: 3,
  };
};

const taskReducer = (state = initialTaskState(), action) => {
  console.log("taskReducer state", state, " action", action);
  console.log("taskReducer state.tasks", state.tasks);

  let asd = state.nextId + 1;
  console.log(
    "taskReducer state.nextId",
    state.nextId,
    "| state.nextId +1:",
    asd
  );
  let res = {};
  switch (action.type) {
    case ADD_TASK:
      state.tasks.push({ ...action.task, id: state.nextId });
      res = {
        ...state,
        tasks: state.tasks,
        nextId: state.nextId + 1,
      };
      console.log("taskReducer", res);
      return res;
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id !== action.taskId),
      };
    case FETCH_DATA:
      res = {
        ...state,
        tasks: action.tasks,
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
 * It calculates the order by simply order them by deadline,
 * and from now on continously work one-by-one.
 * @returns Returns an ordered list in which we need to solve the given tasks.
 */
function calculateSchedule(tasks) {
  let schedule = [tasks.at(0)];
  tasks.slice(1).forEach((task) => {
    let placed = false;
    let i = 0;
    while (!placed && i < schedule.length) {
      const compTask = schedule[i];
      if (task.deadline < Date.now()) {
        // Already overdue
        // TODO: COOP WITH OVERDUE AS THEY SAID
        console.log("overdue!!!", task);
        placed = true;
      } else if (task.deadline < compTask.deadline) {
        console.log("result:", task.deadline, "<", compTask.deadline);
        schedule = schedule.slice(0, i).concat([task], schedule.slice(i));
        placed = true;
      }
      i++;
    }
    if (!placed) {
      schedule.push(task);
    }

    console.log("added");
    // schedule.map((task,i) => console.log("task", i ,":", task.name, task.deadline));
  });

  console.log("schedule", schedule);
  return schedule;
}

/**
 * Save data to local storage
 *
 * Note that if the database would be much bigger, the favorites should be saved only.
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
 * Then, this part should also remove the favorites from the all list
 *  */
function loadData() {
  // Retrieve data from a cookie
  const savedData = localStorage.getItem("initialTaskState");
  return savedData ? JSON.parse(savedData) : null;
}

export default taskReducer;
