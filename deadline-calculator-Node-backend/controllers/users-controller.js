const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");

const users = [
  {
    id: uuidv4(),
    name: "Bence Olay",
    email: "test@gmail.com",
    password: "tester",
  },
  {
    id: uuidv4(),
    name: "Kovács Ferenc",
    email: "ferenc.kovacs@gmail.com",
    password: "tester2",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: users });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = users.find((u) => u.email === email);
  if (hasUser) {
    return next(
      new HttpError(
        "Could not create user, user with the given email is already exists.",
        422
      )
    );
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  users.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = users.find((u) => u.email === email);
  console.log("Tried to log in:", email, "with pass:", password);
  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be wrong",
        401
      )
    );
  }

  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
