import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as dashboardAPI from './dashboardAPI.js';

const extractErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong. Please try again';

export const getDashboardStats = createAsyncThunk('dashboard/stats', async (_, { rejectWithValue }) => {
  try {
    const { data } = await dashboardAPI.fetchDashboardStats();
    return data.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const getSalesChart = createAsyncThunk('dashboard/salesChart', async (days, { rejectWithValue }) => {
  try {
    const { data } = await dashboardAPI.fetchSalesChart(days);
    return data.data.salesData;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const getTopProducts = createAsyncThunk('dashboard/topProducts', async (limit, { rejectWithValue }) => {
  try {
    const { data } = await dashboardAPI.fetchTopProducts(limit);
    return data.data.topProducts;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

const initialState = {
  stats: null,
  salesData: [],
  topProducts: [],
  status: 'idle',
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getSalesChart.fulfilled, (state, action) => {
        state.salesData = action.payload;
      })
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.topProducts = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
