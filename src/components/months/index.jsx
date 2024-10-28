import React, { useMemo, useState } from "react";
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
const MonthSales = () => {
  const data = useMemo(() => [
    {
      image: `${TishPhoto}`,
      name: "S-Series Comfort Chair ",
      price: "$190",
      normaleprice: "$400",
    },
    {
      image: `${TishPhoto}`,
      name: "S-Series Comfort Chair ",
      price: "$190",
      normaleprice: "$400",
    },
    {
      image: `${TishPhoto}`,
      name: "S-Series Comfort Chair ",
      price: "$190",
      normaleprice: "$400",
    },
    {
      image: `${TishPhoto}`,
      name: "S-Series Comfort Chair ",
      price: "$190",
      normaleprice: "$400",
    },
    {
      image: `${TishPhoto}`,
      name: "S-Series Comfort Chair ",
      price: "$190",
      normaleprice: "$400",
    },
    {
      image: `${TishPhoto}`,
      name: "S-Series Comfort Chair ",
      price: "$190",
      normaleprice: "$400",
    },
  ]);

  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.header}>
          <button></button>
          <h2>This Month</h2>
        </div>
        <div className={styles.flashHeader}>
          <div className={styles.flashSales}>
            <h2>Best Selling Products</h2>
          </div>

          <div className={styles.viewAll}>
            <button>View All</button>
          </div>
        </div>
        <Swiper
          modules={[Autoplay]}
          className={styles.price}
          spaceBetween={20}
          slidesPerView={4.5}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
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
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
    </Wrapper>
  );
};

export default MonthSales;
