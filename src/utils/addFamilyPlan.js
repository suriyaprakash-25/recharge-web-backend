const mongoose = require('mongoose');
const Plan = require('../models/planModel');
require('dotenv').config();

const newFamilyPlan = [
  {
    name: "Family Plan 599",
    price: 599,
    validity: 28,
    data: "50GB Shared",
    calls: "Unlimited",
    sms: "100/day",
    category: "Family",
    isActive: true
  }
];

const addFamilyPlan = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas');

    await Plan.insertMany(newFamilyPlan);
    console.log('✅ Successfully added new family plan');
    
    const totalPlans = await Plan.countDocuments();
    const familyPlans = await Plan.countDocuments({ category: 'Family' });
    console.log('📊 Total plans in database:', totalPlans);
    console.log('👨‍👩‍👧‍👦 Total family plans:', familyPlans);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding family plan:', error);
    process.exit(1);
  }
};

addFamilyPlan();
