const mongoose = require('mongoose');
const Plan = require('../models/planModel');
require('dotenv').config();

const newPlans = [
  {
    name: "Prepaid 299",
    price: 299,
    validity: 28,
    data: "1.5GB/day",
    calls: "Unlimited",
    sms: "100/day",
    category: "Individual",
    isActive: true
  },
  {
    name: "Prepaid 666",
    price: 666,
    validity: 77,
    data: "1.5GB/day",
    calls: "Unlimited",
    sms: "100/day",
    category: "Individual",
    isActive: true
  }
];

const addPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas');

    await Plan.insertMany(newPlans);
    console.log('✅ Successfully added', newPlans.length, 'new individual plans');
    
    const totalPlans = await Plan.countDocuments();
    console.log('📊 Total plans in database:', totalPlans);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding plans:', error);
    process.exit(1);
  }
};

addPlans();
