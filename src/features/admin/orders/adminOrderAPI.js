import axiosInstance from '../../../services/axiosInstance.js';

export const fetchAllOrders = (params) => axiosInstance.get('/admin/orders', { params });
export const fetchAdminOrderById = (id) => axiosInstance.get(`/admin/orders/${id}`);
export const updateOrderStatusAPI = (id, payload) => axiosInstance.patch(`/admin/orders/${id}/status`, payload);
export const refundOrderPaymentAPI = (orderId, amount) => axiosInstance.post(`/admin/payments/${orderId}/refund`, { amount });
