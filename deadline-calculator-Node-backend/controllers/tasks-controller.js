const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

// Own Error type
const HttpError = require("../models/http-error");

// DB Schema
const Task = require("../models/task");
const User = require("../models/user");

// Controllers:

// GET TASKS
const getTasks = async (req, res, next) => {
  let tasks;
  try {
    tasks = await Task.find();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Fetching tasks failed, please try again later.", 500)
    );
  }

  const tasksObj = tasks.map((task) => task.toObject({ getters: true }));
  console.log("Tasks requested.", tasksObj);
  res.status(200).json({ tasks: tasksObj });
};

const getTasksByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let userWithTasks;
  try {
    userWithTasks = await User.findById(userId)
      .populate({ path: "tasks" })
      .exec();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Fetching tasks failed, please try again later.", 500)
    );
  }

  if (!userWithTasks || userWithTasks.tasks.length === 0) {
    return next(
      new HttpError(
        "Could not find tasks for the provided user ID:" + userId,
        404
      )
    );
  }

  const tasksObj = userWithTasks.tasks.map((task) =>
    task.toObject({ getters: true })
  );
  console.log("Tasks requested.", tasksObj);
  res.json({ tasks: tasksObj });
};

// GET TASK BY ID
const getTaskById = async (req, res, next) => {
  const taskId = req.params.taskId;

  let task;
  try {
    task = await Task.findById(taskId).exec();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Getting tasks failed, please try again.", 500));
  }

  if (!task) {
    return next(
      new HttpError("Could not find a task with the provided ID", 404)
    );
  }

  res.json({ task: task.toObject({ getters: true }) });
};

// CREATE
const createTask = async (req, res, next) => {
  const { name, deadline, turnaroundTime, priority, creator } = req.body;
  console.log("createTask, req.body:", req.body);
  // Check Express-Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const newTask = new Task({
    name,
    deadline,
    turnaroundTime,
    priority,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator, "-password");
  } catch (err) {
    console.log(err);
    return next(new HttpError("Creating task failed, please try again.", 500));
  }

  if (!user) {
    return next(
      new HttpError("Could not find user for provided ID:" + creator, 404)
    );
  }

  console.log("creator exists, saving task starts");
  console.log("newTask", newTask);

  try {
    await newTask.save(); // Save task
  } catch (err) {
    console.log(err);
    return next(new HttpError("Creating task failed, please try again.", 500));
  }

  res.status(201).json({ task: newTask.toObject({ getters: true }) });
};

// UPDATE
const updateTask = async (req, res, next) => {
  // Check Express-Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const taskId = req.params.taskId;
  const { name, deadline, turnaroundTime, priority } = req.body;

  let updatedTask;
  try {
    updatedTask = await Task.findById(taskId).exec();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not find place.",
      500
    );
    return next(error);
  }

  if (!updatedTask) {
    return next(
      new HttpError("There is no such task with the given ID: " + taskId, 422)
    );
  }

  // If undefined, won't use it
  updatedTask.name = name;
  updatedTask.deadline = deadline;
  updatedTask.turnaroundTime = turnaroundTime;
  updatedTask.priority = priority;

  console.log("updatedTask", updatedTask);

  try {
    updatedTask.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ task: updatedTask.toObject({ getters: true }) });
};

// DELETE
const deleteTask = async (req, res, next) => {
  const taskId = req.params.taskId;
  console.log("taskId", taskId);

  let removedTask;
  try {
    removedTask = await Task.findById(taskId)
      .populate({
        path: "creator",
        select: "-password", // You can specify which fields to populate
      })
      .exec();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Something went wrong, could not find task.", 500)
    );
  }

  if (!removedTask) {
    return next(
      new HttpError("There is no such task with the given ID: " + taskId, 422)
    );
  }

  console.log("Try to delete task:", removedTask);
  const sess = await mongoose.startSession();
  sess.startTransaction();
  try {
    const user = removedTask.creator;
    console.log("creator:", user);

    // Delete task
    await Task.deleteOne({ _id: removedTask._id }, { session: sess });

    // Save user with added task
    await user.save({ session: sess });

    // Run the session, and ROLL BACK IF ANY FAILED.
    await sess.commitTransaction();
    sess.endSession();

    console.log("Delete transactions committed successfully!");
  } catch (err) {
    // Handle errors and roll back the transaction
    console.log(err);
    await sess.abortTransaction();
    sess.endSession();
    return next(
      new HttpError("Something went wrong, while deleting a task.", 500)
    );
  }

  res.status(200).json({ message: "Task removed successfully" });
};

exports.getTasks = getTasks;
exports.getTasksByUserId = getTasksByUserId;
exports.getTaskById = getTaskById;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
