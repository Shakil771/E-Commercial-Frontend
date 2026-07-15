import axiosInstance from '../../services/axiosInstance.js';

export const fetchProducts = (params) => axiosInstance.get('/products', { params });
export const fetchProductByIdOrSlug = (idOrSlug) => axiosInstance.get(`/products/${idOrSlug}`);
export const fetchRelatedProducts = (id) => axiosInstance.get(`/products/${id}/related`);
export const fetchCategories = (params) => axiosInstance.get('/categories', { params });
export const fetchProductReviews = (productId, params) => axiosInstance.get(`/products/${productId}/reviews`, { params });
export const submitProductReview = (productId, formData) =>
  axiosInstance.post(`/products/${productId}/reviews`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
