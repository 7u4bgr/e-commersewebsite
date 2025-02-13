import React, { useEffect, useState } from "react";
import Wrapper from "../../components/UI/wrapper/index";
import styles from "./index.module.css";
import { createTask, getAllCategories, getAllSubCategory, getUserInfo } from "../../api";

const FileUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");

  const handleFileUpload = async () => {
    if (!title || !description || !price || !selectedCategoryId) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token bulunamadı! Lütfen tekrar giriş yapın.");
      return;
    }
  
    try {
      const userInfo = await getUserInfo(token);
      if (!userInfo || !userInfo.id) {
        alert("Kullanıcı bilgileri alınamadı!");
        return;
      }
  
      console.log("Doğru User ID:", userInfo.id);
  
      const taskData = {
        title,
        description,
        price,
        categoryName: categories.find(c => c.id === selectedCategoryId)?.categoryName || "",
        subCategoryName: subCategories.find(sc => sc.id === selectedSubCategoryId)?.subCategoryName || "",
        userId: userInfo.id,
      };
      
  
      const result = await createTask(taskData);
      if (result?.error) {
        alert("Görev oluşturulurken bir hata oluştu.");
      } else {
        alert("Görev başarıyla oluşturuldu.");
        setTitle("");
        setDescription("");
        setPrice("");
        setSelectedCategoryId("");
        setSelectedSubCategoryId("");
      }
    } catch (error) {
      console.error("Görev yükleme hatası:", error);
      alert("Görev yüklenirken bir hata oluştu.");
    }
  };
  
  
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response || []);
      } catch (err) {
        console.error("Kategori yükleme hatası:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategoryId) {
        try {
          const response = await getAllSubCategory(selectedCategoryId);
          setSubCategories(Array.isArray(response) ? response : []);
        } catch (err) {
          console.error("Alt kategori yükleme hatası:", err);
          setSubCategories([]);
        }
      } else {
        setSubCategories([]);
      }
    };
    fetchSubCategories();
  }, [selectedCategoryId]);

  return (
    <div className={styles.background}>
      <Wrapper>
        <div className={styles.controlInputs}>
          {/* Başlık Alanı */}
          <div className={styles.inputEdit}>
            <label>Add Title</label>
            <input
              type="text"
              placeholder="Başlık"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Açıklama Alanı */}
          <div className={styles.inputEdit}>
            <label>Add Description</label>
            <input
              type="text"
              placeholder="Açıklama"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* Fiyat Alanı */}
          <div className={styles.inputEdit}>
            <label>Add Price</label>
            <input
              type="text"
              placeholder="Fiyat"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          {/* Kategori Seçimi */}
          <div className={styles.inputEdit}>
            <label>Select Category</label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
            >
              <option value="">Kategori Seçin</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          {/* Alt Kategori Seçimi */}
          <div className={styles.inputEdit}>
            <label>Select Subcategory</label>
            <select
              value={selectedSubCategoryId}
              onChange={(e) => setSelectedSubCategoryId(e.target.value)}
              disabled={!subCategories.length}
            >
              <option value="">Alt Kategori Seçin</option>
              {subCategories.map((subCat) => (
                <option key={subCat.id} value={subCat.id}>
                  {subCat.subCategoryName}
                </option>
              ))}
            </select>
          </div>
          {/* Gönderim Butonu */}
          <div className={styles.inputEdit}>
            <button onClick={handleFileUpload}>Add Post</button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default FileUpload;
