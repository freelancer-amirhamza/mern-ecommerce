import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addProduct = createAsyncThunk(
  "/products/addNewProduct",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const getAllProducts = createAsyncThunk(
  "/products/getAllProducts",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/products/get`
    );
    return result?.data;
  }
);

export const updateProduct = createAsyncThunk(
  "/products/updateProduct",
  async ({formData, id}) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/products/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`
    );
    return result?.data;
  }
);

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state)=>{
        state.isLoading = true;
    })
    .addCase(getAllProducts.fulfilled, (state, action)=>{
        console.log(action.payload)

        state.isLoading = false;
        state.productList = action.payload.data;
    })
    .addCase(getAllProducts.rejected, (state)=>{
        state.isLoading = false;
        state.productList = [];
    })
  },
});


export default adminProductsSlice.reducer;