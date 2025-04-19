const express = require('express');
const { login, register, logout }= require("../controllers/userController");
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(authMiddleware,logout);

module.exports = router;