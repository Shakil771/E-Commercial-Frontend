import axiosInstance from '../../../services/axiosInstance.js';

export const fetchDashboardStats = () => axiosInstance.get('/admin/dashboard/stats');
export const fetchSalesChart = (days) => axiosInstance.get('/admin/dashboard/sales-chart', { params: { days } });
export const fetchTopProducts = (limit) => axiosInstance.get('/admin/dashboard/top-products', { params: { limit } });
