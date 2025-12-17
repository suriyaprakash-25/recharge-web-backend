const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

// Protected admin routes (require authentication + admin role)
router.get("/users", verifyToken, isAdmin, adminController.getAllUsers);
router.get("/stats", verifyToken, isAdmin, adminController.getDashboardStats);
router.get("/recharges", verifyToken, isAdmin, adminController.getAllRecharges);
router.get("/plans", verifyToken, isAdmin, adminController.getAllPlans);
router.post("/plans", verifyToken, isAdmin, adminController.createPlan);
router.put("/plans/:id", verifyToken, isAdmin, adminController.updatePlan);
router.delete("/plans/:id", verifyToken, isAdmin, adminController.deletePlan);

module.exports = router;
