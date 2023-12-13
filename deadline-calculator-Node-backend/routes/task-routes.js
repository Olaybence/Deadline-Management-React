const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const taskControllers = require("../controllers/tasks-controller");

// TASKS Endpoints
router.get("/", taskControllers.getTasks);

router.get("/:taskId", taskControllers.getTaskById);

router.post("/new",
    [
        check("name").not().isEmpty(),
        check("deadline").isDate(),
        check("turnaroundTime").isNumeric(),
        check("priority").isNumeric()
    ], taskControllers.createTask);

router.put("/:taskId", taskControllers.updateTaskAtId);
router.patch("/:taskId", taskControllers.updateTaskAtId);

router.delete("/:taskId", taskControllers.deleteTaskAtId);

module.exports = router;
