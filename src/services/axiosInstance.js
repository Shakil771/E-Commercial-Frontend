import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_KEY } from '../utils/constants.js';
import { getGuestId } from '../utils/validators.js';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send the httpOnly refresh token cookie
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Attach guest cart id for anonymous cart operations; harmless once logged in.
  if (config.url?.includes('/cart')) {
    config.headers['x-guest-id'] = getGuestId();
  }

  return config;
});

let isRefreshing = false;
let pendingQueue = [];

const processQueue = (error, token = null) => {
  pendingQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else promise.resolve(token);
  });
  pendingQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthEndpoint =
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/register') ||
      originalRequest.url?.includes('/auth/refresh');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axiosInstance.post('/auth/refresh');
        const newToken = data.data.accessToken;
        sessionStorage.setItem(ACCESS_TOKEN_KEY, newToken);
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
