import { Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import UserFooter from "./UserFooter";

const UserLayout = () => {
  return (
    <div>
      <UserNavbar />
      <main style={{ minHeight: "78vh", margin: "2px" }}>
        <Outlet />
      </main>
      <UserFooter />
    </div>
  );
};

export default UserLayout;
