import axios from 'axios';

const API_URL = 'http://localhost:8081';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true, // Token çerez olarak saklanıyorsa gerekli olabilir
});

// Her isteğe otomatik olarak Authorization başlığını ekle
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log("İstek öncesi token:", token); // Debugging için
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("Token bulunamadı! Yetkilendirilmiş istek atılamaz.");
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  

export default axiosInstance;