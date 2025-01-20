const Feature = require("../../models/Feature");


const addFeatureImages = async(req, res)=>{
    try {
        const {image} = req.body;

        const featureImages = new Feature({image});
        await featureImages.save()
        res.status(200).json({
            success: true,
            data: featureImages
        })
    } catch (error) {
        console.log(error.msg)
        res.status(500).json({
            success: false,
            message: "something is wrong!"
        })
    }
};


const getFeatureImages = async(req,res)=>{
    try {
        const images = await Feature.find();
        res.status(201).json({
            success: true,
            data: images,
        })
    } catch (error) {
        console.log(error.msg);
        res.status(500).json({
            success: true,
            message: "Something is Wrong!"
        })
    }
}

module.exports = {addFeatureImages, getFeatureImages};