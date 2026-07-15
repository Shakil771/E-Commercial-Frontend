import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as orderAPI from './orderAPI.js';

const extractErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong. Please try again';

export const createOrder = createAsyncThunk('orders/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await orderAPI.createOrderAPI(payload);
    return data.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const getMyOrders = createAsyncThunk('orders/list', async (params, { rejectWithValue }) => {
  try {
    const { data } = await orderAPI.fetchMyOrders(params);
    return { orders: data.data.orders, meta: data.meta };
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const getOrderDetails = createAsyncThunk('orders/details', async (id, { rejectWithValue }) => {
  try {
    const { data } = await orderAPI.fetchOrderById(id);
    return data.data.order;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const cancelOrder = createAsyncThunk('orders/cancel', async ({ id, reason }, { rejectWithValue }) => {
  try {
    const { data } = await orderAPI.cancelOrderAPI(id, reason);
    return data.data.order;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const createPaymentIntent = createAsyncThunk('orders/createPaymentIntent', async (orderId, { rejectWithValue }) => {
  try {
    const { data } = await orderAPI.createPaymentIntentAPI(orderId);
    return data.data.clientSecret;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

const initialState = {
  list: [],
  meta: null,
  current: null,
  lastCreatedOrder: null,
  clientSecret: null,
  status: 'idle',
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.lastCreatedOrder = null;
      state.clientSecret = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastCreatedOrder = action.payload.order;
        state.clientSecret = action.payload.clientSecret;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getMyOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.orders;
        state.meta = action.payload.meta;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.status = 'loading';
        state.current = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.current = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.current = action.payload;
        state.list = state.list.map((order) => (order._id === action.payload._id ? action.payload : order));
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.clientSecret = action.payload;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
