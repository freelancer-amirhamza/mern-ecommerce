import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productsList: [],
    productDetails:null,
};

export const getAllFilteredProducts = createAsyncThunk(
    "/products/getFilteredProducts",
    async ({filterParams, sortParams}) => {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy : sortParams
        })
        const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
        );
        return result?.data;
    }
);

export const getProductDetails = createAsyncThunk("products/getProductDetails",
    async (id)=>{
        const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
        )
        return result?.data;
    }
);


const shoppingProductSlice = createSlice({
    name: "shoppingProductSlice",
    initialState,
    reducers: {
        setProductDetails: (state)=>{
            state.productDetails = null;
        }
    },
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
        }).addCase(getProductDetails.pending, (state)=>{
            state.isLoading= true;
        }).addCase(getProductDetails.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.productDetails = action.payload.data;
        }).addCase(getProductDetails.rejected, (state)=>{
            state.isLoading = false;
            state.productDetails = null;
        })
    },
});

export const {setProductDetails} = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;
