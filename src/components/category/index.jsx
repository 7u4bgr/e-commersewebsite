import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Wrapper from "../UI/wrapper";
import { getAllCategories, getAllSubCategory } from "../../api";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllCategories();
        setCategories(response || []);
      } catch (err) {
        setError("Veriler yüklenirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategoryId) {
        try {
          const response = await getAllSubCategory(selectedCategoryId);
          setSubCategories((prev) => ({
            ...prev,
            [selectedCategoryId]: response || [],
          }));
        } catch (err) {
          console.error("Alt kategori yükleme hatası:", err);
        }
      }
    };
    fetchSubCategories();
  }, [selectedCategoryId]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId((prevCategoryId) =>
      prevCategoryId === categoryId ? null : categoryId
    );
  };

  return (
    <Wrapper>
        <h2>Butun Kategoriyalar</h2>
      <div className={styles.control}>
        <ul className={styles.ul}>
          {categories.map((category) => (
            <li key={category.id}>
           
              <div
                onClick={() => handleCategoryClick(category.id)}
                style={{ cursor: "pointer", fontWeight: "bold" }}
              >
                {category.categoryName}
              </div>

              {/* Alt kategoriler */}
              {selectedCategoryId === category.id && subCategories[category.id] && (
                <ul className={styles.subCategoryUl}>
                  {subCategories[category.id].map((sub) => (
                    <li key={sub.id}>
                      <Link to={`/subcategory-details/${encodeURIComponent(sub.subCategoryName)}`}>
                        {sub.subCategoryName}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {loading && <p>Yükleniyor...</p>}
        {error && <p>{error}</p>}
      </div>
    </Wrapper>
  );
};

export default Category;
