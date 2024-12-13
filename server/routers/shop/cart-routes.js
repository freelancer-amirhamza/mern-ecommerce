const express = require("express");
const router = express.Router();
const { addToCart, getCartItems, updateCartItems, deleteCartItems } = require("../../controllers/shop/cart-controllers.js");


router.post("/add", addToCart);
router.get("/get/:userId", getCartItems);
router.put("/update", updateCartItems);
router.delete("/:userId/:productId", deleteCartItems);


module.exports = router;