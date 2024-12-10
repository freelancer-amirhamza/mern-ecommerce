
const Product = require("../../models/Product")


const getFilteredProduct = async (req, res)=>{
    try {
        const products = await Product.find({});
        return res.status(200).json({
            success:true,
            data: products,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"something is wrong!"
        })
    }
}



module.exports = getFilteredProduct;