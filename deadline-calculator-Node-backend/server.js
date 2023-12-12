const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");

const taskRoutes = require("./routes/task-routes");
const scheduleRoutes = require("./routes/schedule-routes");

const app = express();
const port = 5000;

// This will convert everything in the body of the request to JSON,
// and then pass to the rest of the Middlewares.
app.use(bodyParser.json());

// Middleware(s)
app.use("/api/tasks", taskRoutes);
app.use("/api/schedule", scheduleRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});

// Error handling middleware
app.use((error, req, res, next) => {
  if(res.headerSent) {
    // Someone already sent a response
    return next(error);
  }

  res.status(error.code || 500); // Set or "Something went wrong on the server"
  res.json({message: error.message || "An unknown error occurred!"});
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
