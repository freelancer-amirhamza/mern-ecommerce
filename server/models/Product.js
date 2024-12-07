const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image:String,
    title:String,
    description: String,
    brand:String,
    category:String,
    price:Number,
    salePrice: Number,
    totalStock:Number,
}, {timestamps:true})

const Product = mongoose.model("products", productSchema);

module.exports = Product;