import axiosInstance from '../../../services/axiosInstance.js';

export const fetchAllCategories = (params) => axiosInstance.get('/categories', { params });
export const createCategoryAPI = (formData) =>
  axiosInstance.post('/categories', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateCategoryAPI = (id, formData) =>
  axiosInstance.patch(`/categories/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteCategoryAPI = (id) => axiosInstance.delete(`/categories/${id}`);
