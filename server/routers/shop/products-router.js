const express = require("express");
const getFilteredProduct = require("../../controllers/shop/product-controller");
const router = express.Router();

router.get("/get", getFilteredProduct)



module.exports = router;
