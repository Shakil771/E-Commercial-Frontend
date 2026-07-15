import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as cartAPI from './cartAPI.js';

const extractErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong. Please try again';

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await cartAPI.getCart();
    return data.data.cart;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const addToCart = createAsyncThunk('cart/addItem', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await cartAPI.addItem(payload);
    return data.data.cart;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateItem',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await cartAPI.updateItem(itemId, { quantity });
      return data.data.cart;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const removeCartItem = createAsyncThunk('cart/removeItem', async (itemId, { rejectWithValue }) => {
  try {
    const { data } = await cartAPI.removeItem(itemId);
    return data.data.cart;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const clearCart = createAsyncThunk('cart/clear', async (_, { rejectWithValue }) => {
  try {
    const { data } = await cartAPI.clearCartAPI();
    return data.data.cart;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const applyCartCoupon = createAsyncThunk('cart/applyCoupon', async (code, { rejectWithValue }) => {
  try {
    const { data } = await cartAPI.applyCoupon(code);
    return data.data.cart;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const removeCartCoupon = createAsyncThunk('cart/removeCoupon', async (_, { rejectWithValue }) => {
  try {
    const { data } = await cartAPI.removeCoupon();
    return data.data.cart;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

const initialState = {
  cart: { items: [], subtotal: 0, totalItems: 0, coupon: null },
  status: 'idle',
  error: null,
};

const pending = (state) => {
  state.status = 'loading';
  state.error = null;
};
const rejected = (state, action) => {
  state.status = 'failed';
  state.error = action.payload;
};
const fulfilledWithCart = (state, action) => {
  state.status = 'succeeded';
  state.cart = action.payload;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCartState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, pending)
      .addCase(fetchCart.fulfilled, fulfilledWithCart)
      .addCase(fetchCart.rejected, rejected)
      .addCase(addToCart.pending, pending)
      .addCase(addToCart.fulfilled, fulfilledWithCart)
      .addCase(addToCart.rejected, rejected)
      .addCase(updateCartItemQuantity.fulfilled, fulfilledWithCart)
      .addCase(removeCartItem.fulfilled, fulfilledWithCart)
      .addCase(clearCart.fulfilled, fulfilledWithCart)
      .addCase(applyCartCoupon.fulfilled, fulfilledWithCart)
      .addCase(applyCartCoupon.rejected, rejected)
      .addCase(removeCartCoupon.fulfilled, fulfilledWithCart);
  },
});

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;
