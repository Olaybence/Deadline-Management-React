const express = require("express");

const { calculateSchedule } = require("../algorithms/algorithms");
const { initialTasks } = require("../assets/data");

const router = express.Router();

// // Sample data (you can replace this with a database)
let schedules = calculateSchedule(initialTasks);

// SCHEDULES Endpoints
router.get("/", (req, res) => {
  res.json(schedules);
});

router.get("/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  
  const schedule = tasks.find((t) => t.taskId === taskId);

  if (schedule) {
    res.json(schedule);
  } else {
    res
      .status(404)
      .send("<center><h1>404 NOT FOUND - Schedule not found</h1></center>");
  }
});

module.exports = router;
