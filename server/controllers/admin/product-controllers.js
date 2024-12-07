const { imageUploadUtil } = require("../../config/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something is Wrong!",
    });
  }
};

// add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something is wrong!",
    });
  }
};

// get all products
const getProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something is wrong!",
    });
  }
};

// update products
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
    } = req.body;

    // one way
    const product = await Product.findByIdAndUpdate(
    { _id: id },
    {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
    }
    );
    if (!product)
    return res.status(404).json({
        success: false,
        message: "This Product is not found!",
    });
    
    res.status(200).json({
        success: true,
        data: product,
    });

    // // new way
    // const findProduct = await Product.findById({ _id: id });
    // if (!findProduct)
    //     return res.status(404).json({
    //       success: false,
    //       message: "This Product is not found!",
    //     });
    // findProduct.image = image || findProduct.image;
    // findProduct.title = title || findProduct.title;
    // findProduct.description = description || findProduct.description;
    // findProduct.category = category || findProduct.category;
    // findProduct.brand = brand || findProduct.brand;
    // findProduct.price = price || findProduct.price;
    // findProduct.salePrice = salePrice || findProduct.salePrice;
    // findProduct.totalStock = totalStock || findProduct.totalStock;
    // await findProduct.save();
    // res.status(200).json({
    //   success: true,
    //   data: findProduct,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something is wrong!",
    });
  }
};

// delete Products
const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete({_id:id});
    if(!product)return res.status(404).json({
        success:false,
        message:"the product not found!"
    })

    res.status(200).json({
        success:true,
        message:"The Product has been deleted successfully!",
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something is wrong!",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
