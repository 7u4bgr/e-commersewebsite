import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Wrapper from "../UI/wrapper";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { getAllCategories } from "../../api";
import { Link } from "react-router-dom";

const BrowseCategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCategories();
        setData(Array.isArray(response) ? response : []);
      } catch (err) {
        setError("Veriler yüklenirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;
  if (data.length === 0) return <div>Görüntülenecek kategori bulunamadı.</div>;

  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.header}>
          <button></button>
          <h2>Kategoriler</h2>
        </div>
        <div className={styles.flashSales}>
          <h2>Kategoriye Göz At</h2>
        </div>
        <Swiper
          modules={[Autoplay, Navigation]}
          className={styles.price}
          spaceBetween={20}
          slidesPerView={6}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          navigation
          breakpoints={{
            0: {
              spaceBetween: 10,
              slidesPerView: 2.3,
            },
            768: {
              spaceBetween: 15,
              slidesPerView: 2.5,
            },
            992: {
              spaceBetween: 20,
              slidesPerView: 6,
            },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={`/category-details/${item.categoryName}`} className={styles.border}>
                <div className={styles.images}>
                  <h1>{item.categoryName}</h1>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
    </Wrapper>
  );
};

export default BrowseCategory;
