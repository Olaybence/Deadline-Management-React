const express = require("express");
const bodyParser = require("body-parser");

const taskRoutes = require("./routes/task-routes");
const scheduleRoutes = require("./routes/schedule-routes");

const app = express();
const port = 5000;

// Middleware
app.use("/api/tasks", taskRoutes);
app.use("/api/schedule", scheduleRoutes);
// app.use(bodyParser.json());

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
