import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Notify } from "../components/Notify";

import { instance } from "../utils/axios";

import Logo from "../assets/logo.png";

const Register = () => {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerRef = useRef();
  const handleImageErr = (e) => {
    e.target.src = "https://pixlr.com/images/index/ai-image-generator-one.webp";
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const form = registerRef.current;
      const payload = new FormData(form);
      const { data } = await instance.post("/users/register", payload);
      setMsg(data?.msg);
      setTimeout(() => {
        navigate("/login"); // TODO redirect to email verification page
      }, 2000);
    } catch (err) {
      const errMsg =
        err?.response?.data?.msg || "Something went wrong. Try again!";
      setError(errMsg);
    } finally {
      setTimeout(() => {
        setError("");
        setMsg("");
      }, 3000);
    }
  };
  return (
    <div>
      <div className="flex d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-lg mb-5" style={{ width: "450px" }}>
          <div className="card-body">
            <div className="text-center">
              <img
                src={Logo}
                className="img-fluid"
                alt="Movie Mate logo"
                onError={(e) => handleImageErr(e)}
                width="200px"
              />
            </div>
            <h1 className="text-center">Register with us</h1>
            {error && <Notify message={error} />}
            {msg && <Notify variant="success" message={msg} />}
            <form onSubmit={(e) => handleRegister(e)} ref={registerRef}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input className="form-control" name="name" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Profile Picture</label>
                <input type="file" className="form-control" name="profile" />
              </div>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>
          <hr />
          <div className="text-center mb-2">
            <Link
              className="flex"
              style={{ textDecoration: "none", cursor: "pointer" }}
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
