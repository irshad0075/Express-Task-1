const express = require("express");
const router = express.Router();
const productController = require("./productController");

// Route to get products from the API and save them to the database
router.get("/getProducts", productController.getProducts);

// Route to add a new category to the database
router.post("/addCategory", productController.addCategory);

// Route to add a new brand to the database
router.post("/addBrand", productController.addBrand);

module.exports = router;
