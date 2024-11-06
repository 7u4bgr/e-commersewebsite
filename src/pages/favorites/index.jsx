import React from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper/index";
import { useFavorites } from "../../favoritescontext";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { EyeIcon, FavoriIcon } from "../../icons";
import { Link } from "react-router-dom";
const Favorites = () => {
  const { favorites } = useFavorites();

  console.log("Favori ürünler:", favorites); // Favorilere eklenen ürünlerin burada çıktısını alın

  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.control}>
          <div className={styles.header}>
            <h2>Wishlist (count)</h2>
            <Link>Move to bags</Link>
          </div>

          {favorites.length > 0 ? (
            <Swiper
              className={styles.price}
              spaceBetween={20}
              slidesPerView={4.5}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              breakpoints={{
                0: {
                  spaceBetween: 10,
                  slidesPerView: 1.3,
                },
                768: {
                  spaceBetween: 15,
                  slidesPerView: 2.5,
                },
                992: {
                  spaceBetween: 20,
                  slidesPerView: 4.5,
                },
              }}
            >
              {favorites.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className={styles.border}>
                    <div className={styles.images}>
                      <img src={item.image} alt={item.name} loading="lazy" />
                      <h2 className={styles.salesPosition}>
                        {item.salesprice}
                      </h2>
                      <div className={styles.favoriIcons}>
                        <FavoriIcon />
                      </div>
                      <div className={styles.eyeIcons}>
                        <EyeIcon />
                      </div>
                    </div>
                    <div className={styles.itemName}>
                      <h2>{item.name}</h2>
                      <h3>
                        {item.price} <h4>{item.normaleprice}</h4>
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>Favori ürün bulunamadı.</p>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Favorites;
