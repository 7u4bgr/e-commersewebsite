import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import { addTaskToFavorites, getTaskByCategory, getUserInfo } from "../../api";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EyeIcon, FavoriIcon } from "../../icons";
const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const userInfo = await getUserInfo(token);
        if (userInfo) {
          setUserId(userInfo.id);
        }
      }
    }
    const fetchTasks = async () => {
      try {
        const response = await getTaskByCategory(categoryName);
        console.log("API Response:", response);
        if (response && Array.isArray(response)) {
          setTasks(response);
        } else {
          setTasks([]);
        }
      } catch (err) {
        setError("Görevler yüklenirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData()
    fetchTasks();
  }, [categoryName]);
  const handleAddFavorites = async (item) => {

    if (userId) {
      try {
        console.log("Favorilere ekleniyor... Kullanıcı ID:", userId, "Ürün ID:", item.id);
        await addTaskToFavorites(userId, item.id); // Doğru şekilde kullanıcı ID'si ve görev ID'sini gönderiyoruz
        setFavorites((prevFavorites) => [...prevFavorites, item]);
        alert("Ürün favorilere eklendi!");
      } catch (error) {
        console.error("Favorilere eklenirken hata oluştu:", error);
        alert("Favorilere eklenirken bir hata oluştu.");
      }
    } else {
      alert("Kullanıcı giriş yapmamış. Lütfen giriş yapın.");
    }
  };
  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;
  if (tasks.length === 0) return <div>Bu kategoriye ait görev bulunamadı.</div>;

  return (
    <div className={styles.container}>
      <h2>{categoryName} Posts</h2>
      <ul>
        {tasks.map((item) => (
          <div key={item.id} className={styles.border}>
            <div className={styles.images}>
              <Swiper spaceBetween={20} slidesPerView={1} autoplay={{ delay: 2000 }}>
                <SwiperSlide>
                  <img src={item.photoPath} alt={item.title} loading="lazy" />
                </SwiperSlide>
              </Swiper>
              {userId ? (
                <button onClick={() => handleAddFavorites(item)} className={styles.favIcons}>
                  <FavoriIcon />
                </button>
              ) : (
                <button onClick={() => alert("Lütfen giriş yapın.")} className={styles.favIcons}>
                  <FavoriIcon />
                </button>
              )}

              <Link to={`/product-details/${item.id || "no-id"}`} className={styles.eyeIcons}>
                <EyeIcon />
              </Link>


            </div>
            <div className={styles.itemName}>
              <p><h4>Title</h4>:{item.title}</p>
              <p><h4>Category</h4>:{item.categoryName || 'Kategori yok'}</p>
              <p><h4>SubCategory</h4>:{item.subCategoryName || 'Alt kategori yok'}</p>
              <p><h4>Description</h4>:{item.description}</p>
              <button>Price:{item.price}$</button>
            </div>

          </div>
        ))}
      </ul>
    </div>
  );
};

export default CategoryProducts;