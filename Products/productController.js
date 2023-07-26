const axios = require("axios");
const Product = require("./ProductModel");
const Brand = require("./BrandModel");
const Category = require("./CategoryModel");

// Controller to get all products from the database
const getProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find({}).populate("category brand").exec();

    // Respond with the list of products
    res.json(products);
  } catch (error) {
    // Handle errors if fetching products fails
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to add a new category to the database
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the category already exists in the database
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      // If the category exists, return an error message
      return res.status(400).json({ message: "Category already exists." });
    }

    // Create a new category
    const newCategory = new Category({ name });
    await newCategory.save();

    res.json({ message: "Category added successfully." });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to add a new brand to the database
const addBrand = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the brand already exists in the database
    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      // If the brand exists, return an error message
      return res.status(400).json({ message: "Brand already exists." });
    }

    // Create a new brand with the provided name and save it to the database
    const newBrand = new Brand({ name });
    await newBrand.save();

    res.json({ message: "Brand added successfully." });
  } catch (error) {
    console.error("Error adding brand:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getProducts, addCategory, addBrand };
