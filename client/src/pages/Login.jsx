import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { instance } from "../utils/axios";

import Logo from "../assets/logo.png";

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handleImageErr = (e) => {
    e.target.src = "https://pixlr.com/images/index/ai-image-generator-one.webp";
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const result = await instance.post("/users/login", payload);
      console.log({ result });
    } catch (err) {
      console.log(err);
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
            <h1 className="text-center">Login</h1>
            <form onSubmit={(e) => handleLogin(e)}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setPayload((prev) => {
                      return { ...prev, email: e.target.value };
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setPayload((prev) => {
                      return { ...prev, password: e.target.value };
                    })
                  }
                />
                <Link
                  className="flex d-flex flex-row-reverse"
                  to="/forget-password"
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  Forget Password?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <hr />
          <div className="text-center mb-2">
            <Link
              className="flex"
              style={{ textDecoration: "none", cursor: "pointer" }}
              to="/register"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
