const express = require("express");
const router = express.Router();
const Plan = require("../models/planModel");

// Public route to get all active plans
router.get("/", async (req, res) => {
  try {
    const plans = await Plan.find().sort({ price: 1 });
    console.log('Found plans:', plans.length);
    res.json({
      message: "Plans retrieved successfully",
      plans,
    });
  } catch (err) {
    console.error('Error fetching plans:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
