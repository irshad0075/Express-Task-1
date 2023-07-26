const express = require("express");
const router = express.Router();
const productController = require("./productController");

const {
  getProducts,
  addCategory,
  addBrand,
  getAllCategory,
  getCategoryByName,
} = productController;

router.get("/getProducts", getProducts);
router.post("/addCategory", addCategory);
router.post("/addBrand", addBrand);
router.get("/getAllCategory", getAllCategory);
router.get("/getCategory/:name", getCategoryByName);

module.exports = router;
