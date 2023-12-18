const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

// const { calculateSchedule } = require("../algorithms/algorithms");
const HttpError = require("../models/http-error");

const ScheduleItem = require("../models/schedule-item");
const Task = require("../models/task");
const User = require("../models/user");

// GET SCHEDULES
const getSchedule = async (req, res, next) => {
  console.log("getSchedule");

  let schedule;
  try {
    schedule = await ScheduleItem.find();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Fetching schedule failed, please try again later.", 500)
    );
  }

  const scheduleObj = schedule.map((item) => item.toObject({ getters: true }));
  console.log("schedule :", schedule);
  console.log("scheduleObj requested:", scheduleObj);
  res.status(200).json({ schedule: scheduleObj });
};

const getScheduleByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  console.log("getScheduleByUserId id: ", userId);

  let scheduleByUser;
  try {
    scheduleByUser = await ScheduleItem.find({ userId: userId }).exec();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Fetching schedules failed, please try again later.", 500)
    );
  }

  if (!scheduleByUser || scheduleByUser.length === 0) {
    return next(
      new HttpError(
        "Could not find schedules for the provided user id:" + userId,
        404
      )
    );
  }

  const scheduleByUserObj = scheduleByUser.map((item) =>
    item.toObject({ getters: true })
  );
  console.log("schedule requested:", scheduleByUserObj);
  res.status(200).json({ schedule: scheduleByUserObj });
};

// GET SINGLE SCHEDULE_ITEM
const getScheduleItemById = async (req, res, next) => {
  const scheduleId = req.params.scheduleId;
  console.log("getScheduleItemById id: ", scheduleId);

  let scheduleItem;
  try {
    scheduleItem = await ScheduleItem.findById(scheduleId);
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Fetching schedule failed, please try again later.", 500)
    );
  }

  if (!scheduleItem) {
    return next(
      new HttpError(
        "Could not find schedules with the provided ID:" + scheduleId,
        404
      )
    );
  }

  scheduleItemObj = scheduleItem.toObject({ getters: true });
  console.log("schedule requested:", scheduleItemObj);
  res.status(200).json({ schedule: scheduleItemObj });
};

const getScheduleItemByTaskId = async (req, res, next) => {
  const taskId = req.params.taskId;
  console.log("getScheduleItemByTaskId id: ", taskId);

  let scheduleItem;
  try {
    scheduleItem = await ScheduleItem.findOne({ taskId: taskId });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Fetching tasks failed, please try again later.", 500)
    );
  }

  if (!scheduleItem) {
    return next(
      new HttpError(
        "Could not find schedule for the provided task ID:" + taskId,
        404
      )
    );
  }

  scheduleItemObj = scheduleItem.toObject({ getters: true });
  console.log("schedule requested:", scheduleItemObj);
  res.status(200).json({ schedule: scheduleItemObj });
};

// EDIT SCHEDULE_ITEMS
const createScheduleItem = async (req, res, next) => {
  const { userId, taskId, startDate, endDate, remainingTime, timeSpent } =
    req.body;
  console.log("createScheduleItem, req.body:", req.body);
  console.log("typeof startDate:", typeof startDate);
  console.log("startDate:", startDate);

  // Check Express-Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("errors", errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const newScheduleItem = new ScheduleItem({
    userId,
    taskId,
    startDate,
    endDate,
    remainingTime,
    timeSpent,
  });

  // CHECK USER
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    console.log(err);
    return next(new HttpError("Creating task failed, please try again.", 500));
  }

  if (!user) {
    return next(
      new HttpError("Could not find user for provided ID:" + userId, 404)
    );
  }

  // CHECK TASK
  let task;
  try {
    task = await Task.findById(taskId);
  } catch (err) {
    console.log(err);
    return next(new HttpError("Creating task failed, please try again.", 500));
  }

  if (!task) {
    return next(
      new HttpError("Could not find task for provided ID:" + taskId, 404)
    );
  }

  if (task.schedule) {
    return next(
      new HttpError(
        "The task is already assigned, please update the existing scheduleItem instead. taskId:" +
          taskId,
        422
      )
    );
  }

  // CREATE SCHEDULE_ITEM
  console.log("creator exists, saving task starts");
  console.log("user", user);
  console.log("task", task);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    // Save new schedule item
    await newScheduleItem.save({ session: sess });

    // Add to task
    task.schedule = newScheduleItem._id;
    // Save task with the given schedule
    await task.save({ session: sess });

    // Run the session, and ROLL BACK IF ANY FAILED.
    await sess.commitTransaction();
    sess.endSession();
  } catch (err) {
    // Handle errors and roll back the transaction
    console.log(err);
    await sess.abortTransaction();
    sess.endSession();
    return next(
      new HttpError("Creating schedule failed, please try again.", 500)
    );
  }

  res
    .status(201)
    .json({ scheduleItem: newScheduleItem.toObject({ getters: true }) });
};

const updateScheduleItem = async (req, res, next) => {
  const scheduleItemId = req.params.taskId;
  const { userId, taskId, startDate, endDate, remainingTime, timeSpent } =
    req.body;

    // TODO: UPDATE!
  console.log("createScheduleItem, req.body:", req.body);
};

const deleteScheduleItem = async (req, res, next) => {
  const scheduleItemId = req.params.taskId;

  let deletScheduleItem;
  try {
    deletScheduleItem = await ScheduleItem.findById(scheduleItemId)
      .populate({
        path: "taskId",
      })
      .exec();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError(
        "Something went wrong, while deleting a schedule item.",
        500
      )
    );
  }

  if (!deletScheduleItem) {
    return next(
      new HttpError(
        "The schedule item does not exists with the given ID:" + scheduleItemId,
        401
      )
    );
  }

  console.log("Try to delete schedule item:", deletScheduleItem);
  const sess = await mongoose.startSession();
  sess.startTransaction();
  try {
    const task = deletScheduleItem.taskId;
    
    // Delete schedule item
    await ScheduleItem.deleteOne({ _id: scheduleItemId }, { session: sess });
    
    // Unassign task of the deleted schedule
    if (task) {
      task.schedule = undefined;
      await task.save({ session: sess });
    }

    // Run the session, and ROLL BACK IF ANY FAILED.
    await sess.commitTransaction();
    sess.endSession();

    console.log("Delete schedule item transactions committed successfully!");
  } catch (err) {
    // Handle errors and roll back the transaction
    await sess.abortTransaction();
    sess.endSession();
    console.log(err);
    return next(
      new HttpError(
        "Something went wrong, while deleting a schedule item.",
        500
      )
    );
  }

  res.status(200).json({ message: "Schedule item removed successfully" });
};

// EXPORTS
exports.getSchedule = getSchedule;
exports.getScheduleByUserId = getScheduleByUserId;

exports.getScheduleItemById = getScheduleItemById;
exports.getScheduleItemByTaskId = getScheduleItemByTaskId;

exports.createScheduleItem = createScheduleItem;
exports.updateScheduleItem = updateScheduleItem;
exports.deleteScheduleItem = deleteScheduleItem;
