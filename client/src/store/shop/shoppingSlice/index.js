import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productsList: [],
};

export const getAllFilteredProducts = createAsyncThunk(
    "/products/getFilteredProducts",
    async () => {
        const result = await axios.get(
            "http://localhost:4000/api/shop/products/get"
        );
        return result?.data;
    }
);

const shoppingProductSlice = createSlice({
    name: "shoppingProductSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllFilteredProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllFilteredProducts.fulfilled, (state, action) => {
            console.log(action.payload)
            state.isLoading = false;
            state.productsList = action.payload.data;
        }).addCase(getAllFilteredProducts.rejected, (state) => {
            state.isLoading = false;
            state.productsList = [];
        })
    },
});

export default shoppingProductSlice.reducer;
