import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    addressList: [],
}

export const addNewAddress = createAsyncThunk("/address/addNewAddress",
    async (formData) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/address/add`,
        formData );
        return response.data;
    }
)

export const getAddressList = createAsyncThunk("/address/getAddressList",
    async (userId) => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`);
        return response.data;
    }
)

export const updateAddress = createAsyncThunk("/address/updateAddress",
    async ({ userId, addressId, formData }) => {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/shop/address/update/${userId}/${addressId}`,
        formData );
        return response.data;
    }
);

export const deleteAddress = createAsyncThunk("/address/deleteAddress",
    async ({ userId, addressId }) => {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`);
        return response.data;
    }
);
const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addNewAddress.pending, (state)=>{
            state.isLoading = true;
        }).addCase(addNewAddress.fulfilled, (state)=>{
            state.isLoading = false;
        }).addCase(addNewAddress.rejected, (state)=>{
            state.isLoading = false;
        }).addCase(getAddressList.pending, (state)=>{
            state.isLoading = true;
        }).addCase(getAddressList.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.addressList = action.payload.data;
        }).addCase(getAddressList.rejected, (state)=>{
            state.isLoading = false;
            state.addressList = [];
        }).addCase(updateAddress.pending, (state)=>{
            state.isLoading = true;
        }).addCase(updateAddress.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.addressList = action.payload.data;
        }).addCase(updateAddress.rejected, (state)=>{
            state.isLoading = false;
            state.addressList = [];
        }).addCase(deleteAddress.pending, (state)=>{
            state.isLoading = true;
        }).addCase(deleteAddress.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.addressList = action.payload.data;
        }).addCase(deleteAddress.rejected, (state)=>{
            state.isLoading = false;
            state.addressList = [];
        })
    }
})


export default addressSlice.reducer;