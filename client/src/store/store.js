import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import adminProductsSlice from "./admin/productSlice/index";
import shoppingProductSlice from "./shop/shoppingSlice/index"
import shoppingCartSlice from "./shop/cart-slice/index";
import shoppingAddress from "./shop/address-slice/index";

const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shoppingProducts: shoppingProductSlice,
        shoppingCarts: shoppingCartSlice,
        addressSlice: shoppingAddress,
        
    }
})

export default store;