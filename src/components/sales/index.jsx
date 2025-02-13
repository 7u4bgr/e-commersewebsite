import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Wrapper from "../UI/wrapper";
import { addTaskToFavorites, getAllTask, getUserInfo } from "../../api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EyeIcon } from "../../icons";
import { Link } from "react-router-dom";

const SalesToday = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [favorites, setFavorites] = useState([]); // Store the added favorites locally

  useEffect(() => {
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
        const response = await getAllTask();
        console.log("API'den gelen veri:", response);
        if (Array.isArray(response)) {
          setData(response);
        } else {
          setData(response.data || []);
        }
      } catch (err) {
        console.error("API isteği başarısız:", err);
        setError("Veriler yüklenirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData(); // Kullanıcı verisini al
    fetchData(); // Görev verisini al
  }, []);

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
  

  if (loading) return <div className={styles.loader}>Veriler yükleniyor...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.header}>
          <h2>Bugünün Satışları</h2>
          {userId ? (
            <button>
              <Link to="/createpost" className={styles.createPostButton}>
                Yeni Gönderi Oluştur
              </Link>
            </button>
          ) : (
            <button onClick={() => alert("Lütfen giriş yapın.")} className={styles.createPostButton}>
              Yeni Gönderi Oluştur
            </button>
          )}
        </div>
        <div className={styles.flashHeader}>
          <div className={styles.flashSales}>
            <h2>Flash Satışlar</h2>
          </div>
        </div>
        <div className={styles.controlBorder}>
          {(data || []).map((item) => (
            <div key={item.id} className={styles.border}>
              <div className={styles.images}>
                <Swiper spaceBetween={20} slidesPerView={1} autoplay={{ delay: 2000 }}>
                  <SwiperSlide>
                    <img src={item.photoPath} alt={item.title} loading="lazy" />
                  </SwiperSlide>
                </Swiper>
                <Link to={`/product-details/${item.id}`} className={styles.eyeIcons}>
                  <EyeIcon />
                </Link>
              </div>
              <div className={styles.itemName}>
                <h2>{item.title}</h2>
                <p>{item.categoryName}</p>
                <p>{item.description}</p>
                <button>{item.price}$</button>
                {userId ? (
                  <button onClick={() => handleAddFavorites(item)}>Favorilere Ekle</button>
                ) : (
                  <button onClick={() => alert("Lütfen giriş yapın.")}>Favorilere Ekle</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default SalesToday;
