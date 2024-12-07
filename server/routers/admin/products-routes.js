const express = require("express");
const { upload } = require("../../config/cloudinary");
const{ handleImageUpload, addProduct, getProducts, updateProduct, deleteProduct} = require("../../controllers/admin/product-controllers");
const router = express.Router();


router.post("/upload-image", upload.single("my_file"), handleImageUpload );
router.post("/add", addProduct );
router.get("/get", getProducts);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;