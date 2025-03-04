import axios from "axios";
import axiosInstance from "../axiosInstance";
import { jwtDecode } from "jwt-decode";
const API_URL = "http://localhost:8081";

//login ucun
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signin`, credentials, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const token = response.data;
    console.log("Token alındı:", token);
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error("Login error", error);
    return false;
  }
};

export const getUserInfo = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("User info fetch response:", response.data);
    return response.data;
  } catch (error) {
    console.error("User info fetch error", error);
    return null;
  }
};

export const signUpApi = async (credentials) => {
  try {
    const formData = new FormData();

    // JSON verilerini ekleyelim
    formData.append("organizationName", credentials.organizationName);
    formData.append("phonenumber", credentials.phonenumber);
    formData.append("adress", credentials.adress);
    formData.append("username", credentials.username);
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);

    // Burada profileImage bir File nesnesi olmalı!
    if (credentials.profileImage) {
      formData.append("profileImage", credentials.profileImage);
    } else {
      console.log("Profile Image is NULL!");
    }

    console.log("Gönderilen FormData:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Form verilerini konsola yazdır
    }

    const response = await axios.post(`${API_URL}/api/auth/signup`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Hatası:", error);
    return { error: "Qeydiyyatdan kecmedi" };
  }
};

export const createTask = async (taskData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Token bulunamadı! Lütfen tekrar giriş yapın.");
    return { error: true };
  }

  try {
    const response = await axios.post(`${API_URL}/api/tasks/createTask`, taskData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Görev oluşturulurken hata:", error);
    return { error: true };
  }
};


export const getAllTask = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/tasks/allTask`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    return { error: "Tasklar gosterilmedi" };
  }
};

export const removeIdTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/tasks/remove/${taskId}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return { error: "Task silinmedi" }
  }
}

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/all/category/get/all/category`);
    return response.data;
  } catch (error) {
    return { error: "Kategoriler gösterilemedi" };
  }
};
export const getAllSubCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/all/subCategories/${categoryId}`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Alt kategoriler yüklenirken hata oluştu.");
  }
};


export const getCategoryForAll = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/all/${id}/details`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    return { error: "Kategori gösterilemedi" };
  }
};
export const getCategoryForSubCategory = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/all/subCategories/${id}`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error("Alt kategoriler alınamadı:", error);
    return { error: "Alt kategoriler yüklenirken bir hata oluştu." };
  }
};

export const addTaskToFavorites = async (userId, taskId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error("Token bulunamadı, kullanıcı giriş yapmamış.");
    return;
  }
  try {
    const response = await axios.post(
      `${API_URL}/add/users/${userId}/favorites/${taskId}`,
      {}, // Burada herhangi bir ek veri göndermiyorsanız boş bırakabilirsiniz
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Favorilere eklendi:", response.data);
    return response.data;
  } catch (error) {
    console.error("Favorilere eklenirken hata oluştu:", error);
    throw new Error("Favorilere eklenemedi.");
  }
};
export const getAllFavorites = async () => {
  try {
    const response = await axios.get(`${API_URL}/add/allFavorites`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Favoriler alınamadı:', error);
    throw new Error("Favoriler alınamadı.");
  }
};
export const getUserFavorites = async (userId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error("Token bulunamadı, kullanıcı giriş yapmamış.");
    return;
  }
  try {
    const response = await axios.get(
      `${API_URL}/add/users/${userId}/favorites`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Favoriler alınamadı:', error || error.message || error.response);
    throw new Error("Favoriler alınamadı.");
  }
};
export const deleteFavoriteId = async (userId, taskId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error("Token bulunamadı, kullanıcı giriş yapmamış.");
    return;
  }

  try {
    if (!taskId || !userId) {
      throw new Error("userId veya taskId eksik");
    }

    const response = await axios.delete(`${API_URL}/add/delete/${userId}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Favori başarıyla silindi:", response.data);
    return response.data;
  } catch (error) {
    console.error("Favori silinemedi:", error);
    throw new Error("Favori silinemedi.");
  }
};




export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/user/${userId}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    return { error: "User gösterilemedi" };
  }
};
export const getTaskByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/api/tasks/task/categories/${categoryId}`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return { error: "Kategorinin görevleri gelmedi" };
  }
};


export const getTaskBySubCategory = async (subCategoryName) => {
  try {
    const response = await axios.get(`${API_URL}/api/tasks/categories/sub/${subCategoryName}`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return { error: "Alt kategorinin görevleri yüklenirken hata oluştu." };
  }
};


export const getTaskById = async (taskId) => {
  try {
    const response = await axios.get(`${API_URL}/api/tasks/details/${taskId}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    console.log("Task alındı:", response.data);
    return response.data;
  } catch (error) {
    console.error("Task çekilemedi:", error);
    return { error: "Task gösterilemedi" };
  }
};
export const getSearchTask = async (taskName) => {
  try {
    const response = await axios.get(`${API_URL}/api/tasks/search/${taskName}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Task çekilemedi:", error);
    return { error: "Task gösterilemedi" };
  }
}




export const getUserTasks = async () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId'); // User ID'yi de localStorage'dan alıyoruz
  if (!token || !userId) {
    console.error("Token veya User ID bulunamadı, kullanıcı giriş yapmamış.");
    return;
  }

  try {
    // Dinamik URL kullanımı: kullanıcı ID'siyle görevleri getiriyoruz
    const response = await axios.get(`${API_URL}/api/tasks/get/${userId}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Token'ı header'a ekliyoruz
      }
    });

    console.log("Tasks API Cevabı:", response.data); // Burada gelen yanıtı kontrol edin
    return response.data;
  } catch (error) {
    console.error("User task error", error);
    return { error: "User task alınamadı" };
  }
};






