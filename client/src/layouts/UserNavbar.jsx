import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";
import Logo from "../assets/logo.png";
import { BiLogInCircle } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const UserNavbar = () => {
  const { quantity } = useSelector((state) => state.cart);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">
          <img src={Logo} width={100} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </Nav>
          <div className="d-flex">
            <ButtonToolbar>
              <ButtonGroup className="me-2">
                <Link className="nav-link" to="/cart">
                  <span className="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle rounded-pill">
                    <FaCartArrowDown size="1.8em" color="maroon" />
                    &nbsp;{quantity}
                  </span>
                </Link>
              </ButtonGroup>
              <ButtonGroup className="me-2">
                <Link className="nav-link" to="/login">
                  <Button className="btn btn-danger btn-sm">
                    <BiLogInCircle />
                  </Button>
                </Link>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;
