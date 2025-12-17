const Recharge = require("../models/rechargeModel");

// CREATE RECHARGE
exports.createRecharge = async (req, res) => {
  try {
    const { planName, amount, validity, data, phoneNumber, paymentMethod, paymentDetails } = req.body;
    const userId = req.user.id; // From JWT token

    const newRecharge = new Recharge({
      userId,
      planName,
      amount,
      validity,
      data,
      phoneNumber,
      paymentMethod,
      paymentDetails,
      status: "Success",
    });

    const savedRecharge = await newRecharge.save();
    res.status(201).json({ 
      message: "Recharge successful",
      recharge: savedRecharge 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET USER'S RECHARGE HISTORY
exports.getRechargeHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const recharges = await Recharge.find({ userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name phoneNumber email');

    res.json({
      message: "Recharge history retrieved successfully",
      recharges,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL RECHARGES (ADMIN)
exports.getAllRecharges = async (req, res) => {
  try {
    const recharges = await Recharge.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name phoneNumber email');

    res.json({
      message: "All recharges retrieved successfully",
      recharges,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
