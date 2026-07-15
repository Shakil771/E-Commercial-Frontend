import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as adminReviewAPI from './adminReviewAPI.js';

const extractErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong. Please try again';

export const getAllReviewsAdmin = createAsyncThunk('adminReviews/list', async (params, { rejectWithValue }) => {
  try {
    const { data } = await adminReviewAPI.fetchAllReviewsAdmin(params);
    return { reviews: data.data.reviews, meta: data.meta };
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const deleteReviewAdmin = createAsyncThunk('adminReviews/delete', async (id, { rejectWithValue }) => {
  try {
    await adminReviewAPI.deleteReviewAdminAPI(id);
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

const adminReviewSlice = createSlice({
  name: 'adminReviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviewsAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllReviewsAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.reviews;
        state.meta = action.payload.meta;
      })
      .addCase(getAllReviewsAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteReviewAdmin.fulfilled, (state, action) => {
        state.list = state.list.filter((r) => r._id !== action.payload);
      });
  },
});

export default adminReviewSlice.reducer;
