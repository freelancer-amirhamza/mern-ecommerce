import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import adminProductsSlice from "./admin/productSlice/index";
import shoppingProductSlice from "./shop/shoppingSlice/index"
import shoppingCartSlice from "./shop/cart-slice/index";
import shoppingAddress from "./shop/address-slice/index";
import shoppingOrderSlice from "./shop/order-slice/index";
import adminOrderSlice from "./admin/orderSlice/index";
import shopSearchSlice from "./shop/searchSlice/index";
import shopReviewSlice from "./shop/review-slice/index";
import featureImageSlice from "./common/feature-slice/index";
const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shoppingProducts: shoppingProductSlice,
        shoppingCarts: shoppingCartSlice,
        addressSlice: shoppingAddress,
        orderSlice: shoppingOrderSlice,
        searchSlice: shopSearchSlice,
        adminOrders : adminOrderSlice,
        reviewsSlice: shopReviewSlice,
        commonSlice : featureImageSlice,
    }
})

export default store;