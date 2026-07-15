import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as adminProductAPI from './adminProductAPI.js';

const extractErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong. Please try again';

export const getAdminProducts = createAsyncThunk('adminProducts/list', async (params, { rejectWithValue }) => {
  try {
    const { data } = await adminProductAPI.fetchAdminProducts(params);
    return { products: data.data.products, meta: data.meta };
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const createProduct = createAsyncThunk('adminProducts/create', async (formData, { rejectWithValue }) => {
  try {
    const { data } = await adminProductAPI.createProductAPI(formData);
    return data.data.product;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const updateProduct = createAsyncThunk('adminProducts/update', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const { data } = await adminProductAPI.updateProductAPI(id, formData);
    return data.data.product;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const deleteProduct = createAsyncThunk('adminProducts/delete', async (id, { rejectWithValue }) => {
  try {
    await adminProductAPI.deleteProductAPI(id);
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

const adminProductSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAdminProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.products;
        state.meta = action.payload.meta;
      })
      .addCase(getAdminProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.list = state.list.map((p) => (p._id === action.payload._id ? action.payload : p));
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p._id !== action.payload);
      });
  },
});

export default adminProductSlice.reducer;
