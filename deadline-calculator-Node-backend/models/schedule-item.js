const mongoose = require("mongoose");

const scheduleItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  taskId: { type: mongoose.Types.ObjectId, required: true, ref: "Task" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  remainingTime: { type: Number, required: true },
  timeSpent: [{ type: Number, required: true }],
});

module.exports = mongoose.model("ScheduleItem", scheduleItemSchema);
