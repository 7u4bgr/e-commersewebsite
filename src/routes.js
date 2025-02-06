import About from "./pages/about";
import AccountEdit from "./pages/accountedit";
import AdminPage from "./pages/adminpage";
import CategoryProducts from "./pages/categoryproducts";
import Contact from "./pages/contact";
import FileUpload from "./pages/createpost";
import DetailsProduct from "./pages/detailsproduct";
import Favorites from "./pages/favorites";
import Home from "./pages/home";
import LoginPage from "./pages/loginpage";
import NotFound from "./pages/notFound";
import SignUp from "./pages/signup";
import StorePage from "./pages/store";
import SubCategoryProducts from "./pages/subcategoryproducts";
const routeItem = (id, title, path, component) => {
  return {
    id,
    title,
    path,
    component,
  };
};

const routes = {
  home: routeItem(1, 'home', "/", Home),
  about: routeItem(2, 'about', "/about", About),
  notFound: routeItem(3, 'notFound', "*", NotFound),
  contact: routeItem(4, "contact", "/contact", Contact),
  loginPage: routeItem(5, "loginPage", "/login", LoginPage),
  signUp: routeItem(6, "signUp", "/signup", SignUp),
  favorites: routeItem(7, "favorites", "/favorites", Favorites),
  accountedit: routeItem(8, "accountedit", "/account/edit", AccountEdit),
  storepage: routeItem(9, "storepage", "/buywishlist", StorePage),
  createpost: routeItem(10, "createpost", "/createpost", FileUpload),
  adminpage: routeItem(11, "adminpage", "/admin", AdminPage),
  detailsproduct: routeItem(12, "detailsproduct", "/product-details/:taskId", DetailsProduct),
  categoryproducts: routeItem(13, "categoryproducts", "/category-details/:categoryName", CategoryProducts),
  subcategoryproducts: routeItem(14, "subcategoryproducts", "/subcategory-details/:subCategoryName", SubCategoryProducts),


};

const routeArr = Object.values(routes);

export { routes, routeArr };
