import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as categoryAPI from './categoryAPI.js';

const extractErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong. Please try again';

export const getAllCategoriesAdmin = createAsyncThunk('categories/list', async (params, { rejectWithValue }) => {
  try {
    const { data } = await categoryAPI.fetchAllCategories(params);
    return data.data.categories;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const createCategory = createAsyncThunk('categories/create', async (formData, { rejectWithValue }) => {
  try {
    const { data } = await categoryAPI.createCategoryAPI(formData);
    return data.data.category;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const updateCategory = createAsyncThunk('categories/update', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const { data } = await categoryAPI.updateCategoryAPI(id, formData);
    return data.data.category;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const deleteCategory = createAsyncThunk('categories/delete', async (id, { rejectWithValue }) => {
  try {
    await categoryAPI.deleteCategoryAPI(id);
    return id;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

const initialState = {
  list: [],
  status: 'idle',
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoriesAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllCategoriesAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(getAllCategoriesAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.list = state.list.map((c) => (c._id === action.payload._id ? action.payload : c));
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c._id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
