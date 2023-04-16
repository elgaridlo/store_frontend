import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  checkoutStatus: 'idle',
  error: null
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price } = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item.id === id);

      if (itemIndex >= 0) {
        // Jika item sudah ada di cart, tambahkan jumlahnya
        state.cartItems[itemIndex].quantity+=1;
      } else {
        // Jika item belum ada di cart, tambahkan item baru
        state.cartItems.push({
          id,
          name,
          price,
          quantity: 1
        });
      }
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

      if (itemIndex >= 0) {
        // Jika item ditemukan di cart, hapus item
        state.cartItems.splice(itemIndex, 1);
      }
    },
    addQuantity: (state, action) => {
      const { id } = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item.id === id);

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity+=1;
      }
    },
    minusQuantity: (state, action) => {
      const { id } = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item.id === id);

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity-=1;
      }
    },
    clearCart: state => {
      state.cartItems = [];
    },
    setCheckoutStatus: (state, action) => {
      state.checkoutStatus = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetError: state => {
      state.error = null;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  addQuantity,
  minusQuantity,
  clearCart,
  setCheckoutStatus,
  setError,
  resetError
} = cartSlice.actions;

export default cartSlice.reducer;