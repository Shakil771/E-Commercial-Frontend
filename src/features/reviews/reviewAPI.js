import axiosInstance from '../../services/axiosInstance.js';

export const fetchReviews = (productId, params) => axiosInstance.get(`/products/${productId}/reviews`, { params });
export const createReviewAPI = (productId, formData) =>
  axiosInstance.post(`/products/${productId}/reviews`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateReviewAPI = (reviewId, payload) => axiosInstance.patch(`/reviews/${reviewId}`, payload);
export const deleteReviewAPI = (reviewId) => axiosInstance.delete(`/reviews/${reviewId}`);
