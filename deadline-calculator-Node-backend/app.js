const express = require('express');
const bodyParser = require('body-parser');
const { initialTasks } = require('./data');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Sample data (you can replace this with a database)
let tasks = initialTasks;
let schedules = [];

// TASKS Endpoints
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/api/tasks/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const task = tasks.find(t => t.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

app.post('/api/tasks/new', (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  tasks.push(newTask);

  res.json(newTask);
});

app.put('/api/tasks/modify/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const updatedTask = req.body;

  tasks = tasks.map(task => (task.id === taskId ? updatedTask : task));

  res.json(updatedTask);
});

app.delete('/api/tasks/remove/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  tasks = tasks.filter(task => task.id !== taskId);

  res.send('Task removed successfully');
});

// SCHEDULES Endpoints
app.get('/api/schedule', (req, res) => {
  res.json(schedules);
});

app.get('/api/schedule/:tagName', (req, res) => {
  const tagName = req.params.tagName;
  // Implement logic to order the schedule by tag
  // ...

  res.json(/* ordered schedule by tag */);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
