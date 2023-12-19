const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();
const scheduleControllers = require("../controllers/schedule-controller");

router.get("/", scheduleControllers.getSchedule);
router.get("/user/:userId", scheduleControllers.getScheduleByUserId);

router.get("/:scheduleItemId", scheduleControllers.getScheduleItemById);
router.get("/task/:taskId", scheduleControllers.getScheduleItemByTaskId);

router.post(
  "/new",
  [
    check("userId").not().isEmpty(),
    check("taskId").not().isEmpty(),
    check("startDate").isISO8601(),
    check("endDate").isISO8601(),
    check("remainingTime").isNumeric(),
    check("timeSpent").isLength({ min: 1 }),
  ],
  scheduleControllers.createScheduleItem
);

router.put(
  "/:scheduleItemId",
  [
    check("userId").not().isEmpty(),
    check("startDate").isISO8601(),
    check("endDate").isISO8601(),
    check("remainingTime").isNumeric(),
    check("timeSpent").isLength({ min: 1 }),
  ],
  scheduleControllers.updateScheduleItem
);
router.patch(
  "/:scheduleItemId",
  [
    check("userId").not().isEmpty(),
    check("startDate").isISO8601(),
    check("endDate").isISO8601(),
    check("remainingTime").isNumeric(),
    check("timeSpent").isLength({ min: 1 }),
  ],
  scheduleControllers.updateScheduleItem
);

router.delete("/:scheduleItemId", scheduleControllers.deleteScheduleItem);

module.exports = router;
