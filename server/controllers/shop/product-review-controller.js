const Order = require("../../models/Order");
const Product = require("../../models/Product");
const ProductReview = require("../../models/Review");





const addProductReview = async (req, res) => {
    try {
        const { userId, productId, userName, reviewMessage, reviewValue } = req.body;

        const order = await Order.findOne({
            userId,
            "cartItems.productId": productId,
            "orderStatus" : "confirmed" || "delivered"
        });
        console.log(order, "order not found")
        if (!order) {
            return res.status(403).json({
                success: false,
                message: "You have to purses product to give review!"
            })
        };

        const checkExistingReview = await ProductReview.findOne({ productId, userId });

        if (checkExistingReview) {
            return res.status(403).json({
                success: false,
                message: "Already You have given review!"
            })
        }

        const newReview = new ProductReview({
            userId,
            userName,
            productId,
            reviewMessage,
            reviewValue
        });
        await newReview.save();

        const review = await ProductReview.find({productId});
        const totalReviewLength = review.length;
        const averageReview = review.reduce((sum , reviewItem)=> sum + reviewItem.reviewValue, 0) / totalReviewLength;

        await Product.findByIdAndUpdate(productId, {averageReview})
        res.status(200).json({
            success: true,
            message: "Your review have been added successfully!",
            data: newReview,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "something is wrong!"
        })
    }
};

const getProductReviews = async(req, res)=>{
    try {
        const {productId} = req.params;
        const reviews = await ProductReview.find({productId});
        res.status(200).json({
            success: false,
            message: "You got Product reviews successfully!",
            data: reviews,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something is wrong!"
        })
    }
}

module.exports = {addProductReview, getProductReviews}