import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Component mount olduğunda localStorage'dan verileri çek
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const addToFavorites = (product) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((item) => item.name === product.name);
      if (isAlreadyFavorite) {
        console.log("Ürün zaten favorilerde:", product);
        return prev;
      }
      const updatedFavorites = [...prev, product];
      // localStorage'a da kaydet
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
