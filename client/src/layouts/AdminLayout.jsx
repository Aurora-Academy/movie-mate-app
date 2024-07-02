import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="d-flex vh-100">
      <AdminSidebar />
      <main className="col-md-9 mt-5 overflow-auto">
        <div className="container d-grid gap-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
