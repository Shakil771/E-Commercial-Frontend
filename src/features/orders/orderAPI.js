import axiosInstance from '../../services/axiosInstance.js';

export const createOrderAPI = (payload) => axiosInstance.post('/orders', payload);
export const fetchMyOrders = (params) => axiosInstance.get('/orders', { params });
export const fetchOrderById = (id) => axiosInstance.get(`/orders/${id}`);
export const cancelOrderAPI = (id, reason) => axiosInstance.patch(`/orders/${id}/cancel`, { reason });
export const createPaymentIntentAPI = (orderId) => axiosInstance.post('/payments/create-intent', { orderId });
export const fetchPaymentStatus = (orderId) => axiosInstance.get(`/payments/${orderId}/status`);
