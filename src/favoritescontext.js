import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([
    
  ]);

  const addToFavorites = (product) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((item) => item.name === product.name);
      if (isAlreadyFavorite) {
        console.log("Ürün zaten favorilerde:", product);
        return prev;
      }
      console.log("Yeni ürün favorilere eklendi:", product);
      return [...prev, product];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
