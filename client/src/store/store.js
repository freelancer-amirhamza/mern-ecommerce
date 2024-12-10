import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import adminProductsSlice from "./admin/productSlice/index";
import shoppingProductSlice from "./shop/shoppingSlice/index"


const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shoppingProducts: shoppingProductSlice,
    }
})

export default store;