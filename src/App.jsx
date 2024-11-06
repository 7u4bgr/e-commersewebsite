import React from "react";
import "./App.css";
import { routeArr } from "./routes";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/scrolltotop";
import { FavoritesProvider } from "./favoritescontext";
import SalesToday from "./components/sales";
import Favorites from "./pages/favorites";

function App() {
  return (
    <FavoritesProvider>
    <BrowserRouter>

      <ScrollToTop>
        <div className="appContainer">
          <Routes>
            {routeArr.map((item) => (
              <Route
                path={item.path}
                key={item.id}
                element={
                  <div className="custom-cursor">
                    <Header />
                  
             
                    <item.component />
                    <Footer />
                  </div>
                }
              />
            ))}
          </Routes>
        </div>
      </ScrollToTop>
    </BrowserRouter>
    </FavoritesProvider>

  );
}

export default App;
