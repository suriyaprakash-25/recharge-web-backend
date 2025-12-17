const mongoose = require("mongoose");

const rechargeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  planName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  validity: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["UPI", "Card", "Wallet"],
    required: true,
  },
  paymentDetails: {
    upiId: String,
    cardNumber: String,
    cardName: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Success", "Failed"],
    default: "Success",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Recharge", rechargeSchema);
