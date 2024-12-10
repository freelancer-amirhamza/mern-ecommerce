const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require("jsonwebtoken");
// middleware 

const userRegister = async (req, res)=>{
    const { userName, email, password } = req.body;

    try {
        const checkUser = await User.findOne({email});
        if(checkUser){ 
            return res.json({
            success: false,
            message: "The email is already exited, Please try again with another email"
        })}
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password: hashPassword,
        });
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "the user is created successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "something is wrong",
        })
    }
}

const userLogin = async (req, res)=>{
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({email});
        if (!checkUser) {
            return res.json({
                success:false,
                message: "This user is not found, Please try again"
            })
        };
        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPasswordMatch) {
            return res.json({
                success:false,
                message: "Incorrect Password, Please enter valid password",
            })
        };
        const token = jwt.sign({
            id: checkUser._id,
            email: checkUser.email,
            userName: checkUser.userName,
            role: checkUser.role,
        }, "CLIENT_SECRET_KEY",
        {expiresIn: "50m"});
        res.cookie("token", token,{ httpOnly:true, secure:false }).json({
            success:true,
            message: "the user is logged in successfully",
            user:{
                id: checkUser._id,
                email: checkUser.email,
                userName: checkUser.userName,
                role: checkUser.role,
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "something is wrong",
        })
    }
}

const userLogout = (req, res)=>{
    res.clearCookie("token").json({
        success:true,
        message: "You're logged out successfully!",
    })
}

// const authMiddleware =  (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token)
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized user!",
//       });
  
//     try {
//       const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
//       req.user = decoded;
//       next();
//     } catch (error) {
//       res.status(401).json({
//         success: false,
//         message: "Unauthorized user!",
//       });
//     }
//   };

module.exports = {userRegister, userLogin, userLogout, };