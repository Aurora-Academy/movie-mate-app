import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/"></Route>
        <Route path="/admin"></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
