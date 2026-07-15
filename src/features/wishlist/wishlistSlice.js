import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as wishlistAPI from './wishlistAPI.js';

const extractErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong. Please try again';

export const getWishlist = createAsyncThunk('wishlist/get', async (_, { rejectWithValue }) => {
  try {
    const { data } = await wishlistAPI.fetchWishlist();
    return data.data.wishlist;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const addToWishlist = createAsyncThunk('wishlist/add', async (productId, { rejectWithValue }) => {
  try {
    const { data } = await wishlistAPI.addToWishlistAPI(productId);
    return data.data.wishlist;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const removeFromWishlist = createAsyncThunk('wishlist/remove', async (productId, { rejectWithValue }) => {
  try {
    const { data } = await wishlistAPI.removeFromWishlistAPI(productId);
    return data.data.wishlist;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

const initialState = {
  wishlist: { products: [] },
  status: 'idle',
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
