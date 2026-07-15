import axiosInstance from '../../services/axiosInstance.js';

export const updateProfileAPI = (payload) => axiosInstance.patch('/users/profile', payload);
export const updateAvatarAPI = (formData) =>
  axiosInstance.post('/users/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const fetchAddresses = () => axiosInstance.get('/users/addresses');
export const addAddressAPI = (payload) => axiosInstance.post('/users/addresses', payload);
export const updateAddressAPI = (addressId, payload) => axiosInstance.patch(`/users/addresses/${addressId}`, payload);
export const deleteAddressAPI = (addressId) => axiosInstance.delete(`/users/addresses/${addressId}`);
