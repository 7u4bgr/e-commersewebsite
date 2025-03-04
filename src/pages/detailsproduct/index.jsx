import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./index.module.css";
import { addTaskToFavorites, getTaskById, getTaskBySubCategory, getUserInfo } from "../../api";

const DetailsProduct = () => {
  const { taskId } = useParams();

  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState({ product: true, tasks: false });
  const [error, setError] = useState(null);
   const [userId, setUserId] = useState(null);
  const [favorites, setFavorites] = useState([]); 
  useEffect(() => {
    if (!taskId || taskId === "undefined") {
      setError("Geçersiz ürün ID'si.");
      setLoading({ product: false, tasks: false });
      return;
    }
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userInfo = await getUserInfo(token);
        if (userInfo) {
          setUserId(userInfo.id);
        }
      }
    };
    const fetchData = async () => {
      try {
        setLoading((prev) => ({ ...prev, product: true }));
        const response = await getTaskById(taskId);
        if (!response) throw new Error("Veri alınamadı.");
        setData(response);
      } catch (err) {
        setError(err.message || "Veri yüklenemedi.");
      } finally {
        setLoading((prev) => ({ ...prev, product: false }));
      }
    };

    fetchData();
    fetchUserData();
  }, [taskId]);

  useEffect(() => {
    if (!data?.subCategoryName) return; // subCategoryName kontrolü
    console.log("Alt Kategori Adı:", data?.subCategory?.subCategoryName);
    const fetchSubCategoryProducts = async () => {
      setLoading((prev) => ({ ...prev, tasks: true }));
      try {
        const response = await getTaskBySubCategory(data.subCategoryName); // subCategoryName ile çekiyoruz
        setTasks(response || []);
      } catch (err) {
        setError("Görevler yüklenirken hata oluştu.");
      } finally {
        setLoading((prev) => ({ ...prev, tasks: false }));
      }
    };
  
    fetchSubCategoryProducts();
  }, [data?.subCategoryName]); 
  const handleAddFavorites = async (item) => {
   
    if (userId) {
      try {
        console.log("Favorilere ekleniyor... Kullanıcı ID:", userId, "Ürün ID:", item.id);
        await addTaskToFavorites(userId, item.id); // Doğru şekilde kullanıcı ID'si ve görev ID'sini gönderiyoruz
        setFavorites((prevFavorites) => [...prevFavorites, item]); // Yeni favoriyi yerel duruma ekliyoruz
        alert("Ürün favorilere eklendi!");
      } catch (error) {
        console.error("Favorilere eklenirken hata oluştu:", error);
        alert("Favorilere eklenirken bir hata oluştu.");
      }
    } else {
      alert("Kullanıcı giriş yapmamış. Lütfen giriş yapın.");
    }
  };
  if (loading.product || loading.tasks) return <div className={styles.loader}>Yükleniyor...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!data) return <div className={styles.error}>Ürün bulunamadı.</div>;

  return (
      <div className={styles.container}>
        <div className={styles.detailsContainer}>
          <p><h4>Title</h4>: {data.title}</p>
          <p><h4>Description</h4>: {data.description}</p>
          <p><h4>Categories</h4>: {data.categoryName}</p>
          <p><h4>SubCategories</h4>: {data.subCategoryName}</p>
          <p><h4>Price</h4>: {data.price}$</p>
        </div>
    
        <h2>Bu Alt Kategorideki Diğer Ürünler:</h2>
        <ul className={styles.productList}>
          {tasks.length === 0 ? (
            <p>Bu kategoriye ait başka ürün bulunamadı.</p>
          ) : (
            tasks
              .filter((item) => item.id !== data.id)
              .map((item) => (
                <li key={item.id} className={styles.productItem}>
                  <h3>Title:{item.title}</h3>
                  <p>Description:{item.description}</p>
                  <p>Price: {item.price}$</p>
                  <Link to={`/product-details/${item.id}`} className={styles.linkButton}>Mehsula bax</Link>
                  <button onClick={() => handleAddFavorites(item)} className={styles.favoriteButton}>
                    Favorilere Ekle
                  </button>
                </li>
              ))
          )}
        </ul>
      </div>
    );
};

export default DetailsProduct;
