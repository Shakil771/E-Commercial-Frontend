import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userAPI from './userAPI.js';

const extractErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong. Please try again';

export const updateProfile = createAsyncThunk('user/updateProfile', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await userAPI.updateProfileAPI(payload);
    return data.data.user;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const updateAvatar = createAsyncThunk('user/updateAvatar', async (formData, { rejectWithValue }) => {
  try {
    const { data } = await userAPI.updateAvatarAPI(formData);
    return data.data.user;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const getAddresses = createAsyncThunk('user/getAddresses', async (_, { rejectWithValue }) => {
  try {
    const { data } = await userAPI.fetchAddresses();
    return data.data.addresses;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const addAddress = createAsyncThunk('user/addAddress', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await userAPI.addAddressAPI(payload);
    return data.data.addresses;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const updateAddress = createAsyncThunk('user/updateAddress', async ({ addressId, payload }, { rejectWithValue }) => {
  try {
    const { data } = await userAPI.updateAddressAPI(addressId, payload);
    return data.data.addresses;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const deleteAddress = createAsyncThunk('user/deleteAddress', async (addressId, { rejectWithValue }) => {
  try {
    const { data } = await userAPI.deleteAddressAPI(addressId);
    return data.data.addresses;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

const initialState = {
  addresses: [],
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      });
  },
});

export default userSlice.reducer;
