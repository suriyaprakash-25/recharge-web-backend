const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// CRUD Routes

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
module.exports = router;