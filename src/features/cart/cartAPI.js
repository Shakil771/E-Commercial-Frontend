import axiosInstance from '../../services/axiosInstance.js';

export const getCart = () => axiosInstance.get('/cart');
export const addItem = (payload) => axiosInstance.post('/cart/items', payload);
export const updateItem = (itemId, payload) => axiosInstance.patch(`/cart/items/${itemId}`, payload);
export const removeItem = (itemId) => axiosInstance.delete(`/cart/items/${itemId}`);
export const clearCartAPI = () => axiosInstance.delete('/cart');
export const applyCoupon = (code) => axiosInstance.post('/cart/coupon', { code });
export const removeCoupon = () => axiosInstance.delete('/cart/coupon');
