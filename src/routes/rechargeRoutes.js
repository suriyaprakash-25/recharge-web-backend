const express = require("express");
const router = express.Router();
const rechargeController = require("../controllers/rechargeController");
const { verifyToken } = require("../middleware/authMiddleware");

// Protected routes (require authentication)
router.post("/", verifyToken, rechargeController.createRecharge);
router.get("/history", verifyToken, rechargeController.getRechargeHistory);
router.get("/all", verifyToken, rechargeController.getAllRecharges);

module.exports = router;
