import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as adminOrderAPI from './adminOrderAPI.js';

const extractErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong. Please try again';

export const getAllOrders = createAsyncThunk('adminOrders/list', async (params, { rejectWithValue }) => {
  try {
    const { data } = await adminOrderAPI.fetchAllOrders(params);
    return { orders: data.data.orders, meta: data.meta };
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const getAdminOrderDetails = createAsyncThunk('adminOrders/details', async (id, { rejectWithValue }) => {
  try {
    const { data } = await adminOrderAPI.fetchAdminOrderById(id);
    return data.data.order;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const updateOrderStatus = createAsyncThunk(
  'adminOrders/updateStatus',
  async ({ id, status, note, trackingNumber }, { rejectWithValue }) => {
    try {
      const { data } = await adminOrderAPI.updateOrderStatusAPI(id, { status, note, trackingNumber });
      return data.data.order;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

const initialState = {
  list: [],
  meta: null,
  current: null,
  status: 'idle',
  error: null,
};

const adminOrderSlice = createSlice({
  name: 'adminOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.orders;
        state.meta = action.payload.meta;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getAdminOrderDetails.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.current = action.payload;
        state.list = state.list.map((o) => (o._id === action.payload._id ? action.payload : o));
      });
  },
});

export default adminOrderSlice.reducer;
