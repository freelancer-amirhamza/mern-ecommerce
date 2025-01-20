const express = require("express");
const {  capturePayment, getOrdersByUser, getOrderDetails, createNewOrder, createOrder } = require("../../controllers/shop/order-controller");
const router = express.Router();


router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getOrdersByUser);
router.get("/details/:id", getOrderDetails);


module.exports = router; 