import axiosInstance from '../../services/axiosInstance.js';

export const fetchWishlist = () => axiosInstance.get('/wishlist');
export const addToWishlistAPI = (productId) => axiosInstance.post(`/wishlist/${productId}`);
export const removeFromWishlistAPI = (productId) => axiosInstance.delete(`/wishlist/${productId}`);
