const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./config/database.js");
const authRouter = require("./routers/auth/auth-router.js")
const adminProductRouter = require("./routers/admin/products-routes.js");
const adminOrderRouter = require("./routers/admin/order-routes.js");
const shopProductRouter = require("./routers/shop/products-router.js");
const shopCartRouter = require("./routers/shop/cart-routes.js");
const shopAddressRouter = require("./routers/shop/address-routes.js");
const shopOrderRouter = require("./routers/shop/order-routes.js");
const shopSearchRouter = require("./routers/shop/search-routes.js");



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
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductRouter );
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);

app.get("/",(req, res)=>{
    res.send("<h1> Welcome to server site</h1> ")
})


module.exports = app   