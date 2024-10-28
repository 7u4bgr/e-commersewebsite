import React, { useMemo } from "react";
import styles from "./index.module.css";
import Wrapper from "../UI/wrapper";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import TishPhoto from "../../assets/images/tish.png";
import {
  CameraIcon,
  GamingIcon,
  HPIcon,
  PCIcon,
  PhoneIcon,
  WatchIcon,
} from "../../icons";
const BrowseCategory = () => {
  const data = useMemo(() => [
    {
      svg: <PhoneIcon />,
      name: "Phone",
    },
    {
      svg: <PCIcon />,
      name: "Computers",
    },
    {
      svg: <WatchIcon />,
      name: "SmartWatch",
    },
    {
      svg: <HPIcon />,
      name: "Camera",
    },
    {
      svg: <HPIcon />,
      name: "HeadPhones",
    },
    {
      svg: <GamingIcon />,
      name: "Gaming",
    },
  ]);
  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.header}>
          <button></button>
          <h2>Categories</h2>
        </div>
        <div className={styles.flashSales}>
          <h2>Browse By Category</h2>
        </div>
        <Swiper
          modules={[Autoplay]}
          className={styles.price}
          spaceBetween={20}
          slidesPerView={6}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
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
              <div className={styles.border}>
                <div className={styles.images}>
                  <h1>{item.svg}</h1>
                  <h2>{item.name}</h2>
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

export default BrowseCategory;
