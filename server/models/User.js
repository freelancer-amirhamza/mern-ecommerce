const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: [true, {message: "this email is already exited"}]
    },
    password:{ 
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;