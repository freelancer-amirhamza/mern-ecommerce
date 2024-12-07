const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./config/database.js");
const authRouter = require("./routers/auth/auth-router.js")
const adminProductRouter = require("./routers/admin/products-routes.js");



app.use(cors({
    origin: "http://localhost:5173",
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        'Content-Type',
        'Authorization', 
        'Catch-Control',
        'Expires',
        'Pragma', 
    ],
    credentials: true,
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductRouter);


app.get("/",(req, res)=>{
    res.send("<h1> Welcome to server site</h1> ")
})


module.exports = app   