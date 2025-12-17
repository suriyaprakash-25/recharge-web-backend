const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  validity: {
    type: Number,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  calls: {
    type: String,
    default: "Unlimited",
  },
  sms: {
    type: String,
    default: "100/day",
  },
  category: {
    type: String,
    enum: ["Individual", "Family"],
    default: "Individual",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Plan", planSchema);
