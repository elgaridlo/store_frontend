import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { baseUrl } from '../../config'

const initialState = {
  products: [],
  status: 'idle',
  error: null,
}

export const fetchProducts = createAsyncThunk('product/fetchProducts', async (filter) => {
  const jwtToken = localStorage.getItem(window.location.origin);
  const AuthStr = `Bearer ${jwtToken}`;

  const axiosInstance = axios.create({
    headers: { Authorization: AuthStr }
  });
  
  const response = await axiosInstance.get(
    `${baseUrl}/api/v1/menus?size=20&page=1`
  );
  
  return response.data
})

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}, // will create action for you
  extraReducers: {
    // you need to create your action
    [fetchProducts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = 'success'
      state.products = action.payload
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export default productSlice.reducer

export const selectProducts = (state) => state.products.products
