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
  const { favorites,removeFromFavorites } = useFavorites();

  console.log("Favori ürünler:", favorites); // Favorilere eklenen ürünlerin burada çıktısını alın
  const handleRemoveItem=(itemName)=>{
    removeFromFavorites(itemName)
  }
  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.control}>
          <div className={styles.header}>
            <h2>Wishlist (count)</h2>
            <Link to={"/buywishlist"} state={{favorites}}>Move to bags</Link>
          </div>
          <div className={styles.price}>
            {favorites.length > 0 ? (
              favorites.map((item, index) => (
                <div key={index} className={styles.border}>
                  <div className={styles.images}>
                    <img src={item.image} alt={item.name} loading="lazy" />
                   
                 
                 
                  </div>
                  <div className={styles.itemName}>
                    <h2>{item.name}</h2>
                    <h3>
                      {item.price} <h4>{item.normaleprice}</h4>
                    </h3>
                    <h1>Add bag <h2 onClick={()=>handleRemoveItem(item.name)}>Remove item</h2></h1>
                  </div>
                </div>
              ))
            ) : (
              <p>Favori ürün bulunamadı.</p>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Favorites;
