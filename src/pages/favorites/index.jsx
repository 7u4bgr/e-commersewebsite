import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import { getUserFavorites, deleteFavoriteId, getUserInfo } from "../../api";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const userInfo = await getUserInfo(token);
        if (userInfo) {
          setUserId(userInfo.id);
        }
      }
    };
    fetchUserData();
  }, []);
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const response = await getUserFavorites(userId);
        if (Array.isArray(response)) {
          setData(response);
          console.log("Favoriler:EEEEEEEE", response);
        } else if (response && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setData([]);
        }
      } catch (err) {
        setError("Favoriler alınırken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [userId]);

  const removeFavorite = async (favoriteId, taskId) => {
    try {
      console.log("userId:", userId, "taskId:", taskId); // Değerleri kontrol et
      if (!userId || !taskId) {
        throw new Error("userId veya taskId eksik");
      }

      await deleteFavoriteId(userId, taskId);
      setData((prevData) => prevData.filter((item) => item.id !== favoriteId));
      console.log("Favori başarıyla silindi:", favoriteId);
    } catch (error) {
      console.error("Favori silinemedi:", error);
      setError("Favori silinemedi.");
    }
  };


  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;
  if (data.length === 0) return <div>Favorileriniz boş.</div>;

  return (
    <Wrapper>
      <div className={styles.background}>
        <h2>Favorileriniz</h2>
        {data.map((item) => (
          <div key={item.id} className={styles.header}>
            <Link to={`/product-details/${item.id}`}>
              <h3>{item.title || "Başlık Yok"}</h3>
              <p>{item.description || "Açıklama Yok"}</p>
              <p>Fiyat: {item.price || "Fiyat Bilgisi Yok"}$</p>
              <p>
                Kategori: {item.category?.categoryName || "Kategori Yok"} →{" "}
                {item.subCategory?.subCategoryName || "Alt Kategori Yok"}
              </p>
            </Link>
            <button
              className={styles.removeButton}
              onClick={() => removeFavorite(item.id, item.id)}
            >
              Sil
            </button>
          </div>
        ))}

      </div>
    </Wrapper>
  );
};

export default Favorites;
