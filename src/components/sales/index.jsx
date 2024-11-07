import React, { useEffect, useMemo, useState } from "react";
import styles from "./index.module.css";
import Wrapper from "../UI/wrapper";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import TishPhoto from "../../assets/images/pskonsol.png";
import { EyeIcon, FavoriIcon } from "../../icons/index";
import { useFavorites } from "../../favoritescontext";
const SalesToday = () => {
  const { addToFavorites } = useFavorites();
  const [clickedItems, setClickedItems] = useState({});
  const [removeItems,setRemoveItems]=useState(false)
  console.log("itemler", addToFavorites);
  const data = useMemo(() => [
    {
      image: `${TishPhoto}`,
      name: "S-Seriasdes Comfort Chair ",
      price: "$19sad0",
      normaleprice: "$40asd0",
      salesprice: "-40%",
    },
    {
      image: `${TishPhoto}`,
      name: "S-Series Com435fort Chair ",
      price: "$190",
      normaleprice: "$400",
      salesprice: "-40%",
    },
    {
      image: `${TishPhoto}`,
      name: "S-Series Comfdggdort Chair ",
      price: "$190",
      normaleprice: "$400",
      salesprice: "-40%",
    },
    {
      image: `${TishPhoto}`,
      name: "S-Series Comdscdsfort Chair ",
      price: "$190",
      normaleprice: "$400",
      salesprice: "-40%",
    },
    {
      image: `${TishPhoto}`,
      name: "S-Series Comfbnmbort Chair ",
      price: "$190",
      normaleprice: "$400",
      salesprice: "-40%",
    },
    {
      image: `${TishPhoto}`,
      name: "S-Series Coyumfort Chair ",
      price: "$190",
      normaleprice: "$400",
      salesprice: "-40%",
    },
  ]);
  useEffect(() => {
    console.log("Clicked Items State:", clickedItems);
  }, [clickedItems]);
  const handleFavoriteClick = (item) => {
    setClickedItems((prev) => ({
      ...prev,
      [item.name]: !prev[item.name],
    }));
    addToFavorites(item);
    localStorage.setItem("item",item)
  };
  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.header}>
          <button></button>
          <h2>Today`s Sales</h2>
        </div>
        <div className={styles.flashHeader}>
          <div className={styles.flashSales}>
            <h2>Flash Sales</h2>
          </div>
          <div className={styles.flashDate}>
            <div className={styles.flashDays}>
              <h1>Days</h1>
              <h2>03</h2>
            </div>
            <h3>:</h3>
            <div className={styles.flashDays}>
              <h1>Hours</h1>
              <h2>23</h2>
            </div>
            <h3>:</h3>
            <div className={styles.flashDays}>
              <h1>Minutes</h1>
              <h2>19</h2>
            </div>
            <h3>:</h3>
            <div className={styles.flashDays}>
              <h1>Seconds</h1>
              <h2>56</h2>
            </div>
          </div>
          <span></span>
          <span></span>
          <span></span>
        </div>
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
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.border}>
                <div className={styles.images}>
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <h2 className={styles.salesPosition}>{item.salesprice}</h2>
                  <div
                    onClick={() => handleFavoriteClick(item)}
                    className={
                      clickedItems[item.name]
                        ? styles.favoriIconsActive
                        : styles.favoriIcons 
                    }
                  >
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
        <div className={styles.viewAll}>
          <button>View All Products</button>
        </div>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
    </Wrapper>
  );
};

export default SalesToday;
