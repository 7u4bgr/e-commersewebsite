import About from "./pages/about";
import Home from "./pages/home";
import LoginPage from "./pages/loginpage";
import NotFound from "./pages/notFound";
import SignUp from "./pages/signup";
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
  loginPage:routeItem(4,"loginPage","/login",LoginPage),
  signUp:routeItem(5,"signUp","/signup",SignUp)
};

const routeArr = Object.values(routes);

export { routes, routeArr };
