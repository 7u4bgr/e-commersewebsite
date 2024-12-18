import axios from "axios";
const API_URL = "http://localhost:8080";
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Login error:", error);
    throw error;
  }
};
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/save`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};
export const sendMessage = async (messageData) => {
  try {
    const response = await axios.post(`${API_URL}/send`, messageData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Mesaj gonderilmedi", error);
    throw error;
  }
};
