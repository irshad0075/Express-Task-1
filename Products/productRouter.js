const express = require("express");
const router = express.Router();
const productController = require("./productController");

router.get("/getProducts", productController.getProducts);

router.post("/addCategory", productController.addCategory);

router.post("/addBrand", productController.addBrand);

module.exports = router;
