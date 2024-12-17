const express = require("express");
const { addAddress, getAddressList, updateAddress, deleteAddress } = require("../../controllers/shop/address-controllers");
const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId",  getAddressList )
router.put("/update/:userId/:addressId",  updateAddress )
router.delete("/delete/:userId/:addressId",  deleteAddress )



module.exports = router;