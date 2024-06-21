import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/"></Route>
        <Route path="/admin"></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
