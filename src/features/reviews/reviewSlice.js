import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as reviewAPI from './reviewAPI.js';

const extractErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong. Please try again';

export const getProductReviews = createAsyncThunk('reviews/list', async ({ productId, params }, { rejectWithValue }) => {
  try {
    const { data } = await reviewAPI.fetchReviews(productId, params);
    return { reviews: data.data.reviews, meta: data.meta };
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const createReview = createAsyncThunk('reviews/create', async ({ productId, formData }, { rejectWithValue }) => {
  try {
    const { data } = await reviewAPI.createReviewAPI(productId, formData);
    return data.data.review;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const deleteReview = createAsyncThunk('reviews/delete', async (reviewId, { rejectWithValue }) => {
  try {
    await reviewAPI.deleteReviewAPI(reviewId);
    return reviewId;
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

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.reviews;
        state.meta = action.payload.meta;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.list = state.list.filter((r) => r._id !== action.payload);
      });
  },
});

export default reviewSlice.reducer;
