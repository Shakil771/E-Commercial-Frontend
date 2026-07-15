import axiosInstance from '../../../services/axiosInstance.js';

export const fetchAdminProducts = (params) => axiosInstance.get('/admin/products', { params });
export const createProductAPI = (formData) =>
  axiosInstance.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateProductAPI = (id, formData) =>
  axiosInstance.patch(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteProductAPI = (id) => axiosInstance.delete(`/products/${id}`);
export const deleteProductImageAPI = (id, publicId) =>
  axiosInstance.delete(`/products/${id}/images/${encodeURIComponent(publicId)}`);
