import { Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/storage";
import { LuUserCircle2 } from "react-icons/lu";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAdmin = JSON.parse(
    localStorage.getItem("currentUser")
  )?.roles?.includes("admin");

  const handleSignOut = () => {
    removeToken();
    removeToken("currentUser");
    navigate("/login");
  };
  return (
    <>
      <div className="col-md-3" style={{ maxWidth: "250px" }}>
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark h-100">
          <Link
            to="/admin"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-4">Movie Mate</span>
          </Link>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link
                to="/admin"
                className={
                  pathname === "/admin"
                    ? "nav-link active"
                    : "nav-link text-white"
                }
              >
                Home
              </Link>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/movies"
                    className={
                      pathname === "/admin/movies"
                        ? "nav-link active"
                        : "nav-link text-white"
                    }
                  >
                    Movies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orders"
                    className={
                      pathname === "/admin/orders"
                        ? "nav-link active"
                        : "nav-link text-white"
                    }
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/users"
                    className={
                      pathname === "/admin/users"
                        ? "nav-link active"
                        : "nav-link text-white"
                    }
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
          </ul>
          <hr />
          <Dropdown>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
              {/* <img
                src="https://github.com/mdo.png"
                alt=""
                width="32"
                height="32"
                className="rounded-circle me-2"
              /> */}
              <span>
                <LuUserCircle2 size="18" />
                &nbsp;
                <strong>{JSON.parse(getToken("currentUser"))?.name}</strong>
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Link className="dropdown-item" to="/admin/profile">
                Profile
              </Link>
              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
