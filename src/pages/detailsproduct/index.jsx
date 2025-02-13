import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./index.module.css";
import { getTaskById, getTaskBySubCategoryName } from "../../api";

const DetailsProduct = () => {
  const { taskId } = useParams();
  const { subCategoryName } = useParams();
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState({ product: true, tasks: false });
  const [error, setError] = useState(null);


  useEffect(() => {
    console.log("Gelen Task ID:", taskId);

    if (!taskId || taskId === "undefined" || isNaN(Number(taskId))) {
      setError("Geçersiz ürün ID'si.");
      setLoading((prev) => ({ ...prev, product: false }));
      return;
    }

    getTaskById(taskId)
      .then((response) => {
        if (!response) {
          throw new Error("Ürün bulunamadı.");
        }
        setData(response);
        fetchSubCategoryProducts(response.subCategoryName);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, product: false }));
      });
  }, [taskId]);


  const fetchSubCategoryProducts = async (categoryName) => {
    setLoading((prev) => ({ ...prev, tasks: true }));
    try {
      console.log("Fetching tasks for subcategory name:", categoryName);
      const response = await getTaskBySubCategoryName(categoryName);
      console.log("API Response:", response);
      if (response && Array.isArray(response)) {
        setTasks(response);
      } else {
        setTasks([]);
      }
    } catch (err) {
      setError("Görevler yüklenirken hata oluştu.");
    } finally {
      setLoading((prev) => ({ ...prev, tasks: false }));
    }
  };

  if (loading.product || loading.tasks) {
    return <div className={styles.loader}>Yükleniyor...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!data) {
    return <div className={styles.error}>Ürün bulunamadı.</div>;
  }

  return (
    <>
      <div className={styles.detailsContainer}>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <p>{data.price}$</p>
        <p>{data.categoryName}</p>
        <p>{data.subCategoryName}</p>
      </div>
      <h2>Bu Alt Kategorideki Diğer Ürünler:</h2>
      <ul>
        {tasks.length === 0 ? (
          <p>Bu kategoriye ait başka ürün bulunamadı.</p>
        ) : (
          tasks.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Fiyat: {item.price} TL</p>
              <p>{item.categoryName}</p>
              <p>{item.subCategoryName}</p>
              <Link to={`/product-details/${item.id}`} className={styles.eyeIcons}>Mehsula bax</Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default DetailsProduct;
