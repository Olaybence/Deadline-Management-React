const { initialTasks } = require("../models/data");
const HttpError = require("../models/http-error");

let tasks = initialTasks;

const getTasks = (req, res, next) => {
  console.log("Tasks requested.");
  res.json(tasks);
};

const getTaskById = (req, res, next) => {
  const taskId = parseInt(req.params.taskId);
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
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  tasks.push(newTask); //unshift() for the first element

  res.status(201).json({ task: newTask });
};

const updateTaskAtId = (req, res, next) => {
  const taskId = parseInt(req.params.taskId);
  const { name, deadline, turnaroundTime, priority } = req.body;

  const updatedTask = { ...tasks.find((task) => task.id === taskId) };

  updatedTask.name = name;
  updatedTask.deadline = deadline;
  updatedTask.turnaroundTime = turnaroundTime;
  updatedTask.priority = priority;

  tasks[taskId] = updatedTask;

  res.status(200).json({ task: updatedTask });
};

const deleteTaskAtId = (req, res, next) => {
  const taskId = parseInt(req.params.taskId);
  removedTask = tasks.find((task) => task.id === taskId);
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
