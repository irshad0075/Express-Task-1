const axios = require("axios");
const Brand = require("./BrandModel");
const Category = require("./CategoryModel");

// Controller to get all products from the dummyjson api
const getProducts = async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/products");

    // Get the products data from the response
    const products = response.data;
    res.json(products);
  } catch (error) {
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

// Get all categories controller
const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    console.error("Error fetching all categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Controller to get a category by name
const getCategoryByName = async (req, res) => {
  try {
    const { name } = req.params;

    // Find the category by name in the database
    const category = await Category.findOne({ name });

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.json({ category });
  } catch (error) {
    console.error("Error fetching category by name:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getProducts,
  addCategory,
  addBrand,
  getAllCategory,
  getCategoryByName,
};
