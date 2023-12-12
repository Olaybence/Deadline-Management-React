const express = require("express");

const router = express.Router();
const usersControllers = require('../controllers/users-controller');

// SCHEDULES Endpoints
router.get("/", usersControllers.getUsers );

router.post("/signup", usersControllers.signup );

router.post("/login", usersControllers.login );

module.exports = router;