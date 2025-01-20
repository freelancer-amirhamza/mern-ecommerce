const mongoose = require("mongoose");


const ProductReviewSchema = new mongoose.Schema({
    userId: String,
    productId: String,
    userName: String,
    reviewMessage: String,
    reviewValue: Number,
}, {timestamps: true});

const ProductReview = mongoose.model("ProductReviews", ProductReviewSchema);

module.exports = ProductReview;