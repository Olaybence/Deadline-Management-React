const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const taskControllers = require("../controllers/tasks-controller");

// TASKS Endpoints
router.get("/", taskControllers.getTasks);

router.get("/task/:taskId", taskControllers.getTaskById);
router.get("/user/:userId", taskControllers.getTasksByUserId);

router.post("/new",
    [
        check("name").not().isEmpty(),
        check("deadline").isDate(),
        check("turnaroundTime").isNumeric(),
        check("priority").isNumeric()
    ], taskControllers.createTask);

router.put("/:taskId", taskControllers.updateTask);
router.patch("/:taskId", taskControllers.updateTask);

router.delete("/:taskId", taskControllers.deleteTask);

module.exports = router;
