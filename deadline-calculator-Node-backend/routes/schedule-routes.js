const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();
const scheduleControllers = require("../controllers/schedule-controller");

// SCHEDULES Endpoints
router.get("/", scheduleControllers.getSchedule);
router.get("/user/:userId", scheduleControllers.getScheduleByUserId);

router.get("/:scheduleId", scheduleControllers.getScheduleItemById);
router.get("/task/:taskId", scheduleControllers.getScheduleItemByTaskId);

router.post(
  "/new",
  [
    check("startDate").isISO8601(),
    check("endDate").isISO8601(),
    check("userId").not().isEmpty(),
    check("taskId").not().isEmpty(),
    check("remainingTime").isNumeric(),
    check("timeSpent").isLength({ min: 1 }),
  ],
  scheduleControllers.createScheduleItem
);

router.put("/:taskId", scheduleControllers.updateScheduleItem);
router.patch("/:taskId", scheduleControllers.updateScheduleItem);

router.delete("/:taskId", scheduleControllers.deleteScheduleItem);

module.exports = router;
