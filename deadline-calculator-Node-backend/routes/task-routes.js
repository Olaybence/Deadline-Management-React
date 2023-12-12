const express = require("express");

const router = express.Router();
const taskControllers = require('../controllers/tasks-controller');

// TASKS Endpoints
router.get("/", taskControllers.getTasks);

router.get("/:taskId", taskControllers.getTaskById);

router.post("/new", taskControllers.createTask);

router.patch("/:taskId", taskControllers.updateTaskAtId);

router.delete("/:taskId", taskControllers.deleteTaskAtId);

module.exports = router;
