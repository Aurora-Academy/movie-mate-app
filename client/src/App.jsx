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

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forget-password" element={<ForgetPassword />}></Route>
        <Route path="/verify-password" element={<VerifyPassword />}></Route>
        <Route path="/verify-email" element={<VerifyEmail />}></Route>

        <Route path="/"></Route>
        <Route path="/admin">
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
