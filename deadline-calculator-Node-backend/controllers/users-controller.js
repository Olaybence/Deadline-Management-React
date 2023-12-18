const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const Task = require("../models/task");
const ScheduleItem = require("../models/schedule-item");

const getUsers = async (req, res, next) => {
  let users;
  try {
    // Dont pass the passwords
    users = await User.find({}, "-password").exec();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }

  const usersObj = users.map((user) => user.toObject({ getters: true }));
  console.log("user requested.", usersObj);
  res.json({ users: usersObj });
};

const signup = async (req, res, next) => {
  const { name, email, password, image } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Signup failed, please try again later.", 500));
  }

  if (existingUser) {
    return next(
      new HttpError(
        "Could not create user, user with the given email is already exists.",
        422
      )
    );
  }

  const createdUser = new User({
    name,
    email,
    password,
    image, // TODO: create and add a default user img URL
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Signing Up failed, please try again.", 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let loginUser;
  try {
    loginUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Login failed, please try again later.", 500));
  }

  if (!loginUser || loginUser.password !== password) {
    return next(
      new HttpError("Invalid credentials, Username or Password is wrong.", 401)
    );
  }

  res.json({ message: "Logged in!" });
};

const deleteUser = async (req, res, next) => {
  const userId = req.body;

  let deletUser;
  try {
    deletUser = await User.findById(userId);
  } catch (err) {
    console.log(err);
    return next(new HttpError("Login failed, please try again later.", 500));
  }

  if (!deletUser) {
    return next(
      new HttpError("The user does not exists with the given ID:" + userId, 401)
    );
  }

  console.log("Try to delete user:", deletUser);
  const sess = await mongoose.startSession();
  sess.startTransaction();
  try {
    const tasksOfUser = await Task.find({ creator: deletUser });
    const schedulesOfUser = await ScheduleItem.find({ userId: deletUser });
    console.log("creator's tasks:", tasksOfUser);

    // Delete user
    await User.deleteOne({ _id: deletUser._id }, { session: sess });

    // Remove tasks of the deleted user
    for (const task of tasksOfUser) {
      // Delete task
      await Task.deleteOne({ _id: task._id }, { session: sess });
    }
    
    // Remove schedules of the deleted user
    for (const scheduleItem of schedulesOfUser) {
      // Delete task
      await Schedule.deleteOne({ _id: scheduleItem._id }, { session: sess });
    }

    // Run the session, and ROLL BACK IF ANY FAILED.
    await sess.commitTransaction();
    sess.endSession();

    console.log("Delete transactions committed successfully!");
  } catch (err) {
    // Handle errors and roll back the transaction
    await sess.abortTransaction();
    sess.endSession();
    console.log(err);
    return next(new HttpError("Creating task failed, please try again.", 500));
  }

  res.status(200).json({ message: "User removed successfully" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.deleteUser = deleteUser;
