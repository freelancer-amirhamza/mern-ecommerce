const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
    userId:String,
    cartId:String,
    cartItems:[
        {
            productId: String,
            title: String,
            image: String, 
            price: String,
            quantity: Number,
        }
    ],
    addressInfo:{
        addressId:String,
        address: String,
        city: String,
        division:String,
        pinCode: String,
        notes: String,
    },
    orderStatus:String,
    paymentMethod: String,
    paymentStatus:String,
    totalAmount: Number,
    orderDate:Date,
    orderUpdate:Date,
    paymentId: String,
    payerId: String
})

const Order = mongoose.model("orders", OrderSchema);

module.exports = Order;