const { v4: uuidv4 } = require("uuid");
const { initialTasks } = require("../models/data");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

let tasks = initialTasks;

const getTasks = (req, res, next) => {
  console.log("Tasks requested.");
  res.json(tasks);
};

const getTaskById = (req, res, next) => {
  const taskId = req.params.taskId;
  const task = tasks.find((t) => {
    return t.id === taskId;
  });

  if (!task) {
    return next(
      new HttpError(
        'Could not find a task with the provided id: "' + taskId + '"',
        404
      )
    );
  }

  res.json({ task });
};

const createTask = (req, res, next) => {
  // Check Express-Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const newTask = req.body;
  newTask.id = uuidv4();
  tasks.push(newTask); //unshift() for the first element

  res.status(201).json({ task: newTask });
};

const updateTaskAtId = (req, res, next) => {
  // Check Express-Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const taskId = req.params.taskId;

  console.log("req.params", req.params);
  console.log("taskId", taskId);

  const { name, deadline, turnaroundTime, priority } = req.body;

  const oldTask = tasks.find((task) => task.id === taskId);

  if (!oldTask) {
    return next(
      new HttpError("There is no such task with the given ID: " + taskId, 422)
    );
  }

  // If undefined, won't use it
  const updatedTask = { ...oldTask };
  updatedTask.name = name || updatedTask.name;
  updatedTask.deadline = deadline || updatedTask.deadline;
  updatedTask.turnaroundTime = turnaroundTime || updatedTask.turnaroundTime;
  updatedTask.priority = priority || updatedTask.priority;

  console.log(
    "tasks.find((task) => task.id === taskId)",
    tasks.find((task) => task.id === taskId)
  );
  console.log("updatedTask", updatedTask);

  tasks[taskId] = updatedTask;

  res.status(200).json({ task: updatedTask });
};

const deleteTaskAtId = (req, res, next) => {
  const taskId = req.params.taskId;
  console.log("taskId", taskId);
  taskToRemove = tasks.find((task) => task.id === taskId);
  if(!taskToRemove) {
    return next(
        new HttpError("Could not find a place for ID: " + taskId, 422)
      );
  }

  console.log("removed task with id:", removedTask.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res
    .status(200)
    .json({ message: "Task removed successfully", task: removedTask });
};

exports.getTasks = getTasks;
exports.getTaskById = getTaskById;
exports.createTask = createTask;
exports.updateTaskAtId = updateTaskAtId;
exports.deleteTaskAtId = deleteTaskAtId;
