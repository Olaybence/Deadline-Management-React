const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  priority: { type: Number, required: true },
  deadline: { type: Date, required: true },
  turnaroundTime: { type: Number, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  schedule: { type: mongoose.Types.ObjectId, required: false, ref: "ScheduleItem" },
});

module.exports = mongoose.model("Task", taskSchema);
