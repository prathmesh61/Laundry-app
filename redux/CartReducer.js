import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      // const item = state.cart.find((item) => item.id === action.payload.id);
      // if (item) {
      //   item.quantity += 1;
      // } else {
      state.cart.push({ ...action.payload, quantity: 1 });
      // }
    },
    removeFromCart: (state, action) => {
      const removeFromCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = removeFromCart;
    },
    incrementQty: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity += 1;
    },
    decrementQty: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity == 1) {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTocart, removeFromCart, incrementQty, decrementQty } =
  cartSlice.actions;

export const subtotal = (state) => {
  state.cart.cart.reduce((total, item) => total + item.price, 0);
};

export default cartSlice.reducer;
