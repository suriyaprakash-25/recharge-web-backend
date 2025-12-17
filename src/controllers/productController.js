const Product = require("../models/productModel");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);

    const savedProduct = await newProduct.save(); // Save to MongoDB

    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// READ ALL
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Get data from MongoDB
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    console.log("Requested ID:", req.params.id);

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// edit product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};