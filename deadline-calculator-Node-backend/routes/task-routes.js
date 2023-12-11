const express = require("express");

const router = express.Router();

const { initialTasks } = require("../assets/data");
let tasks = initialTasks;

// TASKS Endpoints
router.get("/", (req, res) => {
  console.log("Tasks requested.");
  res.json(tasks);
});

router.get("/:taskId", (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res
      .status(404)
      .send("<center><h1>404 NOT FOUND - Task not found</h1></center>");
  }
});

router.post("/new", (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  tasks.push(newTask);

  res.json(newTask);
});

router.put("/modify/:taskId", (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const updatedTask = req.body;

  tasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));

  res.json(updatedTask);
});

router.delete("/remove/:taskId", (req, res) => {
  const taskId = parseInt(req.params.taskId);
  tasks = tasks.filter((task) => task.id !== taskId);

  res.send("Task removed successfully");
});

module.exports = router;
