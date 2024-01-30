import { createSlice } from "@reduxjs/toolkit";
import { Toast } from "react-hot-toast";



const initialState = {
  totalItems : localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setTotalItems(state, value) {
      state.totalItems = value.payload;
    },
    addToCart(state, value) {
      state.totalItems = value.payload;
    },
    removeFromCart(state, value) {
      state.totalItems = value.payload;
    },
    resetCart(state, value) {
      state.totalItems = value.payload;
    },
  },
});

export const { setTotalItems, addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
