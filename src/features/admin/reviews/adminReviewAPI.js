import axiosInstance from '../../../services/axiosInstance.js';

export const fetchAllReviewsAdmin = (params) => axiosInstance.get('/admin/reviews', { params });
export const deleteReviewAdminAPI = (id) => axiosInstance.delete(`/admin/reviews/${id}`);
