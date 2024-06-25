import { FaGithub } from "react-icons/fa";
import Logo from "../assets/logo.png";

const UserFooter = () => {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <img src={Logo} width={100} />
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">
            &copy; {new Date().getFullYear()} MovieMate, Inc
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex px-2">
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <FaGithub />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default UserFooter;
