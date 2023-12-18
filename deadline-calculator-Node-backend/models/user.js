const mongoose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String },
  // tasks: [{ type: mongoose.Types.ObjectId, required: true, ref: "Task" }], // Tasks created by the user.
  // schedule: [{ type: mongoose.Types.ObjectId, required: true, ref: "ScheduleItem" }], // Tasks assigned onto the user.
});

// userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema);
