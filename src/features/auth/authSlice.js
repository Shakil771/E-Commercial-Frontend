import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as authAPI from './authAPI.js';
import { ACCESS_TOKEN_KEY } from '../../utils/constants.js';
import { getGuestId, clearGuestId } from '../../utils/validators.js';
import { fetchCart } from '../cart/cartSlice.js';

const extractErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong. Please try again';

export const register = createAsyncThunk('auth/register', async (payload, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await authAPI.registerUser(payload);
    sessionStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
    await dispatch(mergeCartAfterAuth());
    return data.data.user;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const login = createAsyncThunk('auth/login', async (payload, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await authAPI.loginUser(payload);
    sessionStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
    await dispatch(mergeCartAfterAuth());
    return data.data.user;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const mergeCartAfterAuth = createAsyncThunk('auth/mergeCart', async (_, { dispatch }) => {
  try {
    const guestId = getGuestId();
    await authAPI.mergeGuestCart(guestId);
    clearGuestId();
  } catch (error) {
    // Non-fatal: merging failure shouldn't block login/registration
  } finally {
    dispatch(fetchCart());
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authAPI.logoutUser();
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    return true;
  } catch (error) {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const loadCurrentUser = createAsyncThunk('auth/loadCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.fetchCurrentUser();
    return data.data.user;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const requestPasswordReset = createAsyncThunk('auth/forgotPassword', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.forgotPassword(payload);
    return data.message;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const confirmPasswordReset = createAsyncThunk('auth/resetPassword', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.resetPassword(payload);
    sessionStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
    return data.data.user;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const changePassword = createAsyncThunk('auth/updatePassword', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.updatePassword(payload);
    sessionStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
    return data.data.user;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

const initialState = {
  user: null,
  isAuthenticated: false,
  status: 'idle', // idle | loading | succeeded | failed
  initializing: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'idle';
      })
      .addCase(loadCurrentUser.pending, (state) => {
        state.initializing = true;
      })
      .addCase(loadCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.initializing = false;
      })
      .addCase(loadCurrentUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.initializing = false;
      })
      .addCase(confirmPasswordReset.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
