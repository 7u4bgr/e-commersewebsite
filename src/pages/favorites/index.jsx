import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import { getUserFavorites } from "../../api"; // getUserFavorites kullanın

const Favorites = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setData(response);
        } else if (response && Array.isArray(response.data)) {
          setData(response.data); 
        } else {
          setData([]); // Boş veri dönmesi durumunda
        }
      } catch (err) {
        setError("Favoriler alınırken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

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
              </div>
            ))}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};


export default Favorites;
