import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

// User Routes
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Routes
import Dashboard from "./pages/admin/Dashboard";
import ForgetPassword from "./pages/ForgetPassword";
import VerifyPassword from "./pages/VerifyPassword";
import VerifyEmail from "./pages/VerifyEmail";
// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
// User Pages
import Home from "./pages/user/Home";
import MovieDetail from "./pages/user/MovieDetail";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";

// Routing check
import PrivateRoute from "./components/PrivateRoute";
import Orders from "./pages/admin/orders/Orders";
import Order from "./pages/admin/orders/Order";
import Movies from "./pages/admin/movies/Movies";
import Movie from "./pages/admin/movies/Movie";
import Profile from "./pages/admin/users/Profile";
import User from "./pages/admin/users/User";
import Users from "./pages/admin/users/Users";

const App = () => {
  return (
    <>
      <Routes>
        {/* General Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify-password" element={<VerifyPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="movies/:slug" element={<MovieDetail />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        {/* User Routes for checkout (login)*/}
        <Route path="/" element={<UserLayout />}>
          <Route path="checkout" element={<Checkout />} />
        </Route>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<PrivateRoute component={<Dashboard />} />} />
          <Route
            path="orders"
            element={
              <PrivateRoute component={<Orders />} sysRoles={["admin"]} />
            }
          />
          <Route
            path="orders/:id"
            element={
              <PrivateRoute component={<Order />} sysRoles={["admin"]} />
            }
          />
          <Route
            path="movies"
            element={
              <PrivateRoute component={<Movies />} sysRoles={["admin"]} />
            }
          />
          <Route
            path="movies/:id"
            element={
              <PrivateRoute component={<Movie />} sysRoles={["admin"]} />
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute component={<Users />} sysRoles={["admin"]} />
            }
          />
          <Route
            path="users/:id"
            element={<PrivateRoute component={<User />} sysRoles={["admin"]} />}
          />
          <Route
            path="profile"
            element={<PrivateRoute component={<Profile />} />}
          />
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
