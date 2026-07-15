import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as adminUserAPI from './adminUserAPI.js';

const extractErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong. Please try again';

export const getAllUsers = createAsyncThunk('adminUsers/list', async (params, { rejectWithValue }) => {
  try {
    const { data } = await adminUserAPI.fetchAllUsers(params);
    return { users: data.data.users, meta: data.meta };
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const toggleUserStatus = createAsyncThunk('adminUsers/toggleStatus', async (id, { rejectWithValue }) => {
  try {
    const { data } = await adminUserAPI.toggleUserStatusAPI(id);
    return data.data.user;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const updateUserRole = createAsyncThunk('adminUsers/updateRole', async ({ id, role }, { rejectWithValue }) => {
  try {
    const { data } = await adminUserAPI.updateUserRoleAPI(id, role);
    return data.data.user;
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

const adminUserSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.users;
        state.meta = action.payload.meta;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.list = state.list.map((u) => (u._id === action.payload._id ? action.payload : u));
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.list = state.list.map((u) => (u._id === action.payload._id ? action.payload : u));
      });
  },
});

export default adminUserSlice.reducer;
