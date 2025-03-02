import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import { getTaskByCategory } from "../../api";
import {Link} from "react-router-dom";
const CategoryProducts = () => {
  const { categoryName } = useParams(); 
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTaskByCategory(categoryName); 
        console.log("API Response:", response);
        if (response && Array.isArray(response)) {
          setTasks(response); 
        } else {
          setTasks([]);
        }
      } catch (err) {
        setError("Görevler yüklenirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks(); 
  }, [categoryName]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;
  if (tasks.length === 0) return <div>Bu kategoriye ait görev bulunamadı.</div>;

  return (
    <div className={styles.container}>
      <h2>Kategoriye Ait Görevler</h2>
      <ul>
        {tasks.map((item) => (
          <Link to={`/product-details/${item.id}`} key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Fiyat: {item.price} TL</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CategoryProducts;