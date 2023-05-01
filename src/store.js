import { configureStore } from '@reduxjs/toolkit'
import productReducer from './services/products/productSlice'
import cartReducer from './services/products/cartSlice'
import transactionReducer from './services/products/transactionSlice'

export const store = configureStore({
  reducer: {
    carts: cartReducer,
    products: productReducer,
    transactions: transactionReducer,
  },
})
