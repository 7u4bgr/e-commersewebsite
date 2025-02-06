import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import { deleteFavoriteId, getUserFavorites } from "../../api"; // getAllFavorites yerine getUserFavorites kullan

const Favorites = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kullanıcı ID'sini al
  const userId = localStorage.getItem("userId");


  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) {
        setError("Kullanıcı bulunamadı.");
        setLoading(false);
        return;
      }

      try {
        const response = await getUserFavorites(userId);
        console.log("Favoriler API Cevabı:", response);

        if (Array.isArray(response)) {
          setData(response); // Eğer doğrudan bir array ise
        } else if (response && Array.isArray(response.data)) {
          setData(response.data); // Eğer API `data` içinde favori listesini gönderiyorsa
        } else {
          setData([]); // Hatalı veri formatıysa boş dizi ata
        }
      } catch (err) {
        setError("Favoriler alınırken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  const fetchDeleteFavorites = async (id) => {
    try {
      await deleteFavoriteId(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err) {
      setError("Favori silinirken hata oluştu.");
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;
  if (data.length === 0) return <div>Favorileriniz boş.</div>;

  return (
    <Wrapper>
      <div className={styles.background}>
        <h2>Favorileriniz</h2>
        {data.map((favorite) => (
          <div key={favorite.id} className={styles.header}>
            <h2>Favori ID: {favorite.id}</h2>
            {favorite.tasks?.map((item) => (
              <div key={item.id} className={styles.control}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>{item.price}$</p>
                <img src={item.photoPath} alt={item.title} />
                <button onClick={() => fetchDeleteFavorites(favorite.id)}>
                  Favoriyi Sil
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Favorites;
