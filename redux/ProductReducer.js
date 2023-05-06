import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.product.push({ ...action.payload });
    },
    incrementQuantity: (state, action) => {
      const item = state.product.find((item) => item.id === action.payload);
      item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.product.find((item) => item.id === action.payload);
      if (item.quantity == 1) {
        state.product = state.product.filter(
          (item) => item.id !== action.payload
        );
      } else {
        item.quantity -= 1;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { getProducts, incrementQuantity, decrementQuantity } =
  productSlice.actions;

export default productSlice.reducer;
