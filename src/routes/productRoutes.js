// src/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", verifyToken, productController.getAllProducts);

// Admin only
router.post(
  "/",
  verifyToken,
  authorizeRoles("ADMIN"),
  productController.createProduct
);
router.get("/:id", verifyToken, productController.getProductById);
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("ADMIN"),
  productController.updateProduct
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("ADMIN"),
  productController.deleteProduct
);

module.exports = router;