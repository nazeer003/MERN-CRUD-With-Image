const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "E:\\Easesmith\\frontend\\public\\images");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`; // Add timestamp for uniqueness
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Serve static files (images) from the 'public/images' directory
app.use(
  "/images",
  express.static(
    path.join(__dirname, "E:\\Easesmith\\frontend\\public\\images")
  )
);

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Product schema definition
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  paragraph: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  price: { type: Number, required: true },
  discountPrice: Number,
  image: { type: String, required: true },
  description: { type: String, required: true },
});

// Create Product model
const Product = mongoose.model("Product", productSchema);

// Route to fetch all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a new product
app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const newProduct = new Product({ ...req.body, image: req.file.filename });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to fetch a product by ID (GET)
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Route to update a product (PUT)
app.put("/api/products/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) updatedData.image = req.file.filename;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a product (DELETE)
app.delete("/api/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
