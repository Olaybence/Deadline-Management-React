const { calculateSchedule } = require("../algorithms/algorithms");
const { initialTasks } = require("../models/data");
const HttpError = require("../models/http-error");

// // Sample data (you can replace this with a database)
let schedules = calculateSchedule(initialTasks);

const getSchedule = (req, res, next) => {
  res.json(schedules);
};

const getScheduleById = (req, res, next) => {
  const taskId = req.params.taskId;

  const schedule = schedules.find((t) => {
    return t.taskId === taskId;
  });

  if (!schedule) {
    return next(
      new HttpError(
        'Could not find a task with the provided id: "' + taskId + '"',
        404
      )
    );
  }

  res.json(schedule);
};

exports.getSchedule = getSchedule;
exports.getScheduleById = getScheduleById;