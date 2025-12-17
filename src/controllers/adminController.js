const Plan = require("../models/planModel");
const User = require("../models/userModel");
const Recharge = require("../models/rechargeModel");

// GET ALL USERS (ADMIN)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    const totalUsers = await User.countDocuments();
    const recentUsers = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    res.json({
      message: "Users retrieved successfully",
      totalUsers,
      recentUsers,
      users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET DASHBOARD STATS (ADMIN)
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRecharges = await Recharge.countDocuments();
    const totalRevenue = await Recharge.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Recharges by payment method
    const rechargesByMethod = await Recharge.aggregate([
      { $group: { _id: "$paymentMethod", count: { $sum: 1 }, revenue: { $sum: "$amount" } } }
    ]);

    // Recent recharges (last 30 days)
    const recentRecharges = await Recharge.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    // Monthly revenue trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRevenue = await Recharge.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          revenue: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json({
      message: "Dashboard stats retrieved successfully",
      stats: {
        totalUsers,
        totalRecharges,
        totalRevenue: totalRevenue[0]?.total || 0,
        recentRecharges,
        rechargesByMethod,
        monthlyRevenue,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL PLANS
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    res.json({
      message: "Plans retrieved successfully",
      plans,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE PLAN
exports.createPlan = async (req, res) => {
  try {
    const { name, price, validity, data, calls, sms, category } = req.body;

    const newPlan = new Plan({
      name,
      price,
      validity,
      data,
      calls: calls || "Unlimited",
      sms: sms || "100/day",
      category: category || "Individual",
    });

    const savedPlan = await newPlan.save();
    res.status(201).json({
      message: "Plan created successfully",
      plan: savedPlan,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE PLAN
exports.updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedPlan = await Plan.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({
      message: "Plan updated successfully",
      plan: updatedPlan,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE PLAN
exports.deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPlan = await Plan.findByIdAndDelete(id);
    
    if (!deletedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({
      message: "Plan deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL RECHARGES (ADMIN)
exports.getAllRecharges = async (req, res) => {
  try {
    const recharges = await Recharge.find()
      .populate('userId', 'name phone email')
      .sort({ createdAt: -1 });
    
    res.json({
      message: "Recharges retrieved successfully",
      data: recharges,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
