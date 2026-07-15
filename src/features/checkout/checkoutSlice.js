import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shippingAddress: null,
  paymentMethod: 'card',
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    resetCheckout: () => initialState,
  },
});

export const { setShippingAddress, setPaymentMethod, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
