const mongoose = require('mongoose');
const Plan = require('../models/planModel');
require('dotenv').config();

const samplePlans = [
  {
    name: "Airtel REDX Postpaid 1499",
    price: 1499,
    validity: 30,
    data: "Unlimited",
    calls: "Unlimited",
    sms: "100/day",
    category: "Individual",
    isActive: true
  },
  {
    name: "Postpaid Max 1201",
    price: 1201,
    validity: 30,
    data: "200GB",
    calls: "Unlimited",
    sms: "100/day",
    category: "Individual",
    isActive: true
  },
  {
    name: "Prepaid 449",
    price: 449,
    validity: 28,
    data: "2GB/day",
    calls: "Unlimited",
    sms: "100/day",
    category: "Individual",
    isActive: true
  },
  {
    name: "Prepaid 839",
    price: 839,
    validity: 84,
    data: "2GB/day",
    calls: "Unlimited",
    sms: "100/day",
    category: "Individual",
    isActive: true
  },
  {
    name: "Family Plan 999",
    price: 999,
    validity: 30,
    data: "100GB Shared",
    calls: "Unlimited",
    sms: "100/day",
    category: "Family",
    isActive: true
  },
  {
    name: "Family Plan 1499",
    price: 1499,
    validity: 30,
    data: "Unlimited",
    calls: "Unlimited",
    sms: "100/day",
    category: "Family",
    isActive: true
  }
];

const seedPlans = async () => {
  try {
    // Connect to MongoDB Atlas using .env MONGO_URI
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas');

    // Check if plans already exist
    const existingPlans = await Plan.countDocuments();
    if (existingPlans > 0) {
      console.log(`Database already has ${existingPlans} plans. Skipping seed.`);
      process.exit(0);
    }

    // Insert plans
    await Plan.insertMany(samplePlans);
    console.log('✅ Successfully seeded', samplePlans.length, 'plans to Atlas database');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding plans:', error);
    process.exit(1);
  }
};

seedPlans();
