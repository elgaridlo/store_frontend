import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { baseUrl } from '../../config';

const initialState = {
  checkout: [],
  status: 'idle',
  error: null,
};

export const createTransactions = createAsyncThunk('transaction/createTransactions', async (data) => {
  const jwtToken = localStorage.getItem(window.location.origin);
  const AuthStr = `Bearer ${jwtToken}`;

  const axiosInstance = axios.create({
    headers: { Authorization: AuthStr },
  });

  const response = await axiosInstance.post(`${baseUrl}/api/v1/transactions`, data);

  return response.data;
});

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {}, // will create action for you
  extraReducers: {
    [createTransactions.pending]: (state, action) => {
      state.status = 'loading';
    },
    [createTransactions.fulfilled]: (state, action) => {
      state.status = 'success';
      state.transactions = action.payload;
    },
    [createTransactions.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default transactionSlice.reducer;

export const selectTransaction = (state) => state.transactions;
