import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as couponAPI from './couponAPI.js';

const extractErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong. Please try again';

export const getAllCoupons = createAsyncThunk('coupons/list', async (params, { rejectWithValue }) => {
  try {
    const { data } = await couponAPI.fetchAllCoupons(params);
    return { coupons: data.data.coupons, meta: data.meta };
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const createCoupon = createAsyncThunk('coupons/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await couponAPI.createCouponAPI(payload);
    return data.data.coupon;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const updateCoupon = createAsyncThunk('coupons/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await couponAPI.updateCouponAPI(id, payload);
    return data.data.coupon;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const deleteCoupon = createAsyncThunk('coupons/delete', async (id, { rejectWithValue }) => {
  try {
    await couponAPI.deleteCouponAPI(id);
    return id;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

const initialState = {
  list: [],
  meta: null,
  status: 'idle',
  error: null,
};

const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.coupons;
        state.meta = action.payload.meta;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.list = state.list.map((c) => (c._id === action.payload._id ? action.payload : c));
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c._id !== action.payload);
      });
  },
});

export default couponSlice.reducer;
