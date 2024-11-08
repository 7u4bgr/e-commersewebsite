import React, { useState } from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import { useLocation } from "react-router-dom";

const StorePage = () => {
  const location = useLocation();
  const { favorites } = location.state || { favorites: [] }; //Burada location.state ile, favori ürünlerin olduğu veriyi alıyoruz. Eğer location.state boş ya da undefined ise, boş bir favorites array (dizi) döndürüyoruz ({ favorites: [] }).

  // Favorilerdeki her ürün için count ve toplam fiyatı tutmak için state
  const [productCounts, setProductCounts] = useState(
    favorites.reduce((acc, item) => {
      acc[item.name] = 1; // reduce() her öğe üzerinde işlem yaparak bir yeni değer döndürür. Burada, her ürünün adıyla (product name) eşleşen bir sayıyı başlangıçta 1 olarak ayarlıyoruz. Yani, her ürün için bir sayaç başlatıyoruz.
      return acc;
    }, {})
  );

  // Sayıyı artırmak
  const handleIncrement = (itemName, price) => {
    setProductCounts((prev) => {
      const newCount = prev[itemName] + 1;
      return { ...prev, [itemName]: newCount };
      //prev, önceki state değeridir (yani önceki productCounts).
      //prev[itemName], o ürünün mevcut sayısını alır ve 1 ekleriz.
    });
  };

  // Sayıyı azaltmak
  const handleDecrement = (itemName) => {
    setProductCounts((prev) => {
      const newCount = prev[itemName] > 1 ? prev[itemName] - 1 : 1; // Sayı 1'den küçük olmasın
      return { ...prev, [itemName]: newCount };
    });
  };

  const calculateSubtotal = (price, count) => {
    // Fiyatı sayıya dönüştür
    const numericPrice = parseFloat(price); //parseFloat(price): Fiyatı bir sayıya dönüştürür. Örneğin, "198" (string) değerini 198.00 (sayısal değer) olarak kullanabiliriz.

    // Geçerli bir sayı olup olmadığını kontrol et
    if (isNaN(numericPrice)) {
      return 0; // Eğer fiyat geçerli değilse, 0 döndür
    }

    // Alt toplamı hesapla
    return (numericPrice * count).toFixed(2); // Fiyat x sayıyı döndür
  };

  // Ürünlerin toplam fiyatını hesaplamak
  const calculateTotal = () => {
    return favorites
      .reduce((total, item) => {
        const count = productCounts[item.name] || 1; // Her ürünün sayısını al
        return total + item.price * count; // Fiyat x sayıyı topla
      }, 0)
      .toFixed(2); // Toplamı döndür
  };

  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.control}>
          <div className={styles.header}>
            <h2>Home</h2>
            <h2>/</h2>
            <h3>Cart</h3>
          </div>
          <div className={styles.price}>
            {favorites.length > 0 ? (
              favorites.map((item, index) => {
                const count = productCounts[item.name] || 1; // Bu ürünün sayısı
                const subtotal = calculateSubtotal(item.price, count); // Alt toplam
                return (
                  <div key={index} className={styles.border}>
                    <div className={styles.images}>
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>
                    <div className={styles.itemName}>
                      <h2>{item.name}</h2>
                      <h3>
                        {item.price} <h4>{item.normaleprice}</h4>
                      </h3>
                    </div>
                    <div className={styles.itemCount}>
                      <button onClick={() => handleDecrement(item.name)}>
                        -
                      </button>
                      <h1>{count}</h1>
                      <button
                        onClick={() => handleIncrement(item.name, item.price)}
                      >
                        +
                      </button>
                    </div>
                    <div className={styles.subtotal}>
                      <h2>
                        Subtotal: <h1>${subtotal}</h1>
                      </h2>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No items in the bag.</p>
            )}
            <div className={styles.total}>
              <h2>
                Total: <h1>${calculateTotal()}</h1>
              </h2>{" "}
              {/* Tüm ürünlerin toplam fiyatı */}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default StorePage;
