const Address = require("../../models/Address");



const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pinCode, phone, division, notes } = req.body;
        if (!userId || !address || !city || !pinCode || !phone || !division || !notes) {
            return res.status(404).json({
                success: false,
                message: "Invalid data provided!"
            })
        };

        const createNewlyAddress = new Address({
            userId, address, city, pinCode, phone, division, notes
        })

        await createNewlyAddress.save();

        return res.status(201).json({
            success: true,
            message: "The Address created successfully!",
            data: createNewlyAddress,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something is wrong!"
        })
    }
};

const getAddressList = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "The user id is recommended!"
            })
        };
        const addressList = await Address.find({ userId });

        return res.status(200).json({
            success: true,
            message: "the address get successfully!",
            data: addressList,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something is wrong!"
        })
    }
};

const updateAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const formData = req.body;
        if (!userId || !addressId) {
            return res.status(404).json({
                success: false,
                message: "User and address id is required!"
            })
        };

        const address = await Address.findOneAndUpdate({ _id: addressId, userId },
            formData,
            { new: true })

            if(!address){
                return res.status(404).json({
                    success: false,
                    message: "The Address not found!"
                })
            };

            res.status(200).json({
                success:true,
                message: "The address got successfully!",
                data: address,
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something is wrong!"
        })
    }
};


const deleteAddress = async (req, res) => {
    try {
        const {userId, addressId} = req.params;
        if(!userId || !addressId){
            return res.status(404).json({
                success:false,
                message: "The user and address id is required!"
            })
        };

        const address = await Address.findOneAndDelete({_id: addressId, userId});
    if(!address){
        return res.status(404).json({
            success: false,
            message: "The address is not found!"
        })
    };
    res.status(200).json({
        success:true,
        message: "The address id deleted successfully!",
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something is wrong!"
        })
    }
};

module.exports = { addAddress, getAddressList, updateAddress, deleteAddress };









