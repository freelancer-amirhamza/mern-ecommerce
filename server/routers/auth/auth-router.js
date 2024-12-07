const express = require('express');
const authMiddleware = require('../../middlewares');
const { userLogin, userRegister, userLogout } = require('../../controllers/auth/auth-controllers');
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.get("/check-auth",authMiddleware , (req,res)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        message:"This user is authenticated:",
        user,
    })
})


module.exports = router;