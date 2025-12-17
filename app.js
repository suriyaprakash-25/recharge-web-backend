const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
const app = express();
const port = 3000;
const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");
const rechargeRoutes = require("./src/routes/rechargeRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const planRoutes = require("./src/routes/planRoutes");
require("dotenv").config();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/auth", userRoutes);
app.use("/recharge", rechargeRoutes);
app.use("/admin", adminRoutes);
app.use("/plans", planRoutes);

app.listen(port, () => {
  console.log(`App2 listening at port:${port}`);
});

module.exports = app; 