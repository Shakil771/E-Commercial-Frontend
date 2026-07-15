import axiosInstance from '../../../services/axiosInstance.js';

export const fetchAllCoupons = (params) => axiosInstance.get('/coupons', { params });
export const createCouponAPI = (payload) => axiosInstance.post('/coupons', payload);
export const updateCouponAPI = (id, payload) => axiosInstance.patch(`/coupons/${id}`, payload);
export const deleteCouponAPI = (id) => axiosInstance.delete(`/coupons/${id}`);
