import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as productAPI from './productAPI.js';

const extractErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong. Please try again';

export const getProducts = createAsyncThunk('products/list', async (params, { rejectWithValue }) => {
  try {
    const { data } = await productAPI.fetchProducts(params);
    return { products: data.data.products, meta: data.meta };
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const getProductDetails = createAsyncThunk('products/details', async (idOrSlug, { rejectWithValue }) => {
  try {
    const { data } = await productAPI.fetchProductByIdOrSlug(idOrSlug);
    return data.data.product;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const getRelatedProducts = createAsyncThunk('products/related', async (id, { rejectWithValue }) => {
  try {
    const { data } = await productAPI.fetchRelatedProducts(id);
    return data.data.products;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const getCategories = createAsyncThunk('products/categories', async (params, { rejectWithValue }) => {
  try {
    const { data } = await productAPI.fetchCategories(params);
    return data.data.categories;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

const initialState = {
  list: [],
  meta: null,
  current: null,
  related: [],
  categories: [],
  status: 'idle',
  detailsStatus: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.current = null;
      state.related = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.products;
        state.meta = action.payload.meta;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.detailsStatus = 'loading';
        state.current = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.detailsStatus = 'succeeded';
        state.current = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.detailsStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(getRelatedProducts.fulfilled, (state, action) => {
        state.related = action.payload;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
