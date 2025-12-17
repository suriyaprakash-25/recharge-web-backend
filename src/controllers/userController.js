const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.createUser = async (req, res) => {
  try {
    const { name, phoneNumber, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ phoneNumber }, { email }] });
    if (existingUser) {
      return res.status(400).json({ 
        message: "User with this phone number or email already exists" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
      role: "USER",
    });

    const savedUser = await newUser.save();
    
    // Generate token
    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ 
      message: "User registered successfully",
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        phoneNumber: savedUser.phoneNumber,
        email: savedUser.email,
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    // Check for hardcoded admin credentials
    if (phoneNumber === "0222277777" && password === "Admin@123") {
      // Create or find admin user
      let adminUser = await User.findOne({ phoneNumber });
      
      if (!adminUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        adminUser = await User.create({
          name: "Admin",
          phoneNumber: phoneNumber,
          email: "admin@airtel.com",
          password: hashedPassword,
          role: "ADMIN"
        });
      } else if (adminUser.role !== "ADMIN") {
        // Update existing user to admin
        adminUser.role = "ADMIN";
        await adminUser.save();
      }

      const token = jwt.sign(
        { id: adminUser._id, role: "ADMIN" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        message: "Admin login successful",
        token,
        user: {
          id: adminUser._id,
          name: adminUser.name,
          phoneNumber: adminUser.phoneNumber,
          email: adminUser.email,
          role: "ADMIN"
        }
      });
    }

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};