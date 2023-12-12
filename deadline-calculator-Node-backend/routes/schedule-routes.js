const express = require("express");

const router = express.Router();
const scheduleControllers = require('../controllers/schedule-controller');

// SCHEDULES Endpoints
router.get("/", scheduleControllers.getSchedule );

router.get("/:taskId", scheduleControllers.getScheduleById );

module.exports = router;