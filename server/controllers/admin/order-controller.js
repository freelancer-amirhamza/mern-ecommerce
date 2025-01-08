const Order = require("../../models/Order");



const getAllOrdersOfAllUser = async (req, res)=>{
    try {
        const orders = await Order.find({});
        if(!orders.length){
            return res.status(404).json({
                success: false,
                message: "The order not be found!"
            })
        }
        
        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something is wrong!"
        })
    }
};


const getOrderDetailsForAdmin = async(req, res)=>{
    try {
        const {id} = req.params;
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({
                success: false,
                message: "This order is not found!"
            })
        }
        res.status(200).json({
            success: true,
            message: "the order got found",
            data: order,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something is wrong!"
        })
    }
};

const updateOrderStatus = async(req, res)=>{
    try {
        const {id} = req.params;
        const {orderStatus} = req.body;
        
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({
                success: false,
                message: "The order not found!"
            })
        };

        await Order.findByIdAndUpdate(id,{orderStatus})
        res.status(200).json({
            success: true,
            message: "the order is updated successfully!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something is wrong!"
        })
    }
}


module.exports = {getAllOrdersOfAllUser,getOrderDetailsForAdmin, updateOrderStatus }