import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading : false,
    orderList : [],
    orderDetails: null,
};


export const getAllOrdersByAdmin = createAsyncThunk("/admin/getOrdersByAdmin",
    async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders/get`);
        return response.data;
    }
);

export const getOrderDetailsForAdmin = createAsyncThunk("/admin/getOrderDetailsForAdmin", 
    async(id)=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders/details/${id}`);
        return response.data;
    }
);

export const updateOrderStatus = createAsyncThunk("/admin/updateOrderStatus",
    async({id, orderStatus})=>{
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/orders/update/${id}`,
            {
                orderStatus
            }
        )
        return response.data;
    }
)

const adminOrderSlice = createSlice({
    name: "adminOrderSlice",
    initialState,
    reducers: {
        resetOrderDetails: (state)=>{
            state.orderDetails = null;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getAllOrdersByAdmin.pending, (state)=>{
            state.isLoading = true;
        }).addCase(getAllOrdersByAdmin.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.orderList = action.payload.data;
        }).addCase(getAllOrdersByAdmin.rejected, (state)=>{
            state.isLoading = false;
            state.orderList = null;
        }).addCase(getOrderDetailsForAdmin.pending, (state)=>{
            state.isLoading = true;
        }).addCase(getOrderDetailsForAdmin.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.orderDetails = action.payload.data;
        }).addCase(getOrderDetailsForAdmin.rejected, (state)=>{
            state.isLoading = false;
            state.orderDetails = null;
        })
    }
})

export const {resetOrderDetails} = adminOrderSlice.actions;

export default  adminOrderSlice.reducer;