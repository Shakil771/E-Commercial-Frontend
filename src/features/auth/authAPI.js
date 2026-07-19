import axiosInstance from '../../services/axiosInstance.js';

export const registerUser = (payload) => axiosInstance.post('/auth/register', payload);
export const loginUser = (payload) => axiosInstance.post('/auth/login', payload);
export const logoutUser = () => axiosInstance.post('/auth/logout');
export const fetchCurrentUser = () => axiosInstance.get('/auth/me');
export const forgotPassword = (payload) => axiosInstance.post('/auth/forgot-password', payload);
export const resetPassword = (payload) => axiosInstance.post('/auth/reset-password', payload);
export const updatePassword = (payload) => axiosInstance.patch('/auth/update-password', payload);
export const verifyEmailRequest = (token) => axiosInstance.get(`/auth/verify-email/${token}`);
export const resendVerificationEmail = () => axiosInstance.post('/auth/resend-verification');
export const mergeGuestCart = (guestId) => axiosInstance.post('/cart/merge', { guestId });
