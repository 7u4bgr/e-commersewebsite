import axios from "axios";
import axiosInstance from "../axiosInstance";
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
//user details getirmek ucun
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

//qeydiyyat ucun
export const signUpApi = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, credentials, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return { error: "Qeydiyyatdan kecmedi" };
  }
}

//task yaratmaq ucun
export const createTask = async (taskData,userId) => {
  try {
    const response = await axios.post(`${API_URL}/api/tasks/createTask/${userId}`, taskData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json', 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Görev oluşturulurken hata:', error);
    return { error: 'Görev oluşturulamadı' };
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
    const response = await axiosInstance.get('/all/category/get/all/category');
    return response.data;
  } catch (error) {
    return { error: "Kateqoriyalar gosterilmedi" };
  }
};
export const getAllSubCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/all/subCategories/${categoryId}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("API Response:", response.data);
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
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return { error: "Kateqoriya gosterilmedi" };
  }
}
export const getCategoryForSubCategory = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/all/subCategories/${id}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Alt kategoriler alınamadı:", error);
    return { error: "Alt kategoriler yüklenirken bir hata oluştu." };
  }
};


export const postAddFavorites = async (userId, taskId) => {
  try {
    if (!taskId || !userId) {
      throw new Error("taskId veya userId eksik");
    }

    const response = await axios.post(`${API_URL}/add/add/${userId}/${taskId}`, {}, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Favorilere eklenemedi:', error);
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
  try {
    const response = await axios.get(`${API_URL}/add/favorite/${userId}`, {
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


export const deleteFavoriteId = async (id) => {
  try {
    if (!id) {
      throw new Error("id eksik");
    }
    const response = await axios.delete(`${API_URL}/add/delete/${id}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Favori silinemedi:', error);
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

export const getTaskByCategory = async (categoryName) => {
  try {
    const response = await axios.get(`${API_URL}/api/tasks/task/categories/${categoryName}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("API Response:", response.data); 
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return { error: "Görevler yüklenirken hata oluştu." };
  }
};
export const getTaskBySubCategoryName = async (subCategoryName) => {

  try {
    const response = await axios.get(`${API_URL}/api/tasks/categories/sub/${subCategoryName}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("API Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("API Error:", error.response || error.message);
    return { error: "Görevler yüklenirken hata oluştu." };
  }
};



export const getTaskById = async (taskId) => {
  try {
    const response = await axios.get(`${API_URL}/api/tasks/details/${taskId}`, {
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
};


