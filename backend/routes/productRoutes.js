const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to fetch products", error: error.message });
  }
});

// POST a new product (optional)
router.post("/", async (req, res) => {
  const { name, price, image } = req.body;
  try {
    const newProduct = new Product({ name, price, image });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Unable to add product", error: error.message });
  }
});

module.exports = router;
