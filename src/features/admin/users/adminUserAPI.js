import axiosInstance from '../../../services/axiosInstance.js';

export const fetchAllUsers = (params) => axiosInstance.get('/admin/users', { params });
export const fetchAdminUserById = (id) => axiosInstance.get(`/admin/users/${id}`);
export const toggleUserStatusAPI = (id) => axiosInstance.patch(`/admin/users/${id}/status`);
export const updateUserRoleAPI = (id, role) => axiosInstance.patch(`/admin/users/${id}/role`, { role });
