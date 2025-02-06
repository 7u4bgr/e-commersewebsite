import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { getAllTask, removeIdTask } from '../../api'
import Wrapper from '../../components/UI/wrapper'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EyeIcon } from "../../icons/index"; // Göz ikonu
import FileUpload from '../createpost';
const AdminPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // API'den veriyi alıyoruz
    const fetchData = async () => {
      try {
        const response = await getAllTask();
        console.log("Fetched Data:", response); // Alınan veriyi kontrol ediyoruz
        setData(Array.isArray(response) ? response : []); // Veriyi state'e aktarıyoruz ve dizi olup olmadığını kontrol ediyoruz
      } catch (err) {
        setError("Error loading data"); // Hata durumunda mesaj gösteriyoruz
      } finally {
        setLoading(false); // Veri yüklendikten sonra loading'i false yapıyoruz
      }
    };

    fetchData(); // API çağrısını yapıyoruz
  }, []);



    const handleRemove = async (taskId) => {
    try{

      const response = await removeIdTask(taskId);
      console.log("Removed Data:", response);
      setData(data.filter(item=> item.id !== taskId)) // Alınan veriyi kontrol ediyoruz  
    } catch (err) {
      setError("Error loading data"); 
    }
  }

  if (loading) return <div>Loading...</div>; // Yükleniyor mesajı
  if (error) return <div>{error}</div>;


  return (
    <Wrapper>

      <div className={styles.background}>
        <header>
          <h1>Admin Page</h1>
        <FileUpload/>
        </header>
        <div className={styles.controlBorder}>

        {data?.map((item, index) => (
          <div key={index} className={styles.border}>
            <div className={styles.images}>
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
              >
                <SwiperSlide>
                  <img src={item.photoPath} alt={item.title} loading="lazy" />
                </SwiperSlide>
              </Swiper>
              <div className={styles.eyeIcons}>
                <EyeIcon />
              </div>
            </div>
            <div className={styles.itemName}>
              <h2>{item.title}</h2>
              <h3>{item.category}</h3>
              <p>{item.description}</p>
              <button>{item.price}$</button>
              <button onClick={()=>handleRemove(item.id)}>Remove Order</button>
            </div>
          </div>
        ))}
        </div>

      </div>

    </Wrapper>

  )
}

export default AdminPage