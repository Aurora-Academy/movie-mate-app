import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Notify } from "../components/Notify";

import { instance } from "../utils/axios";

import Logo from "../assets/logo.png";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleImageErr = (e) => {
    e.target.src = "https://pixlr.com/images/index/ai-image-generator-one.webp";
  };

  const handleFP = async (e) => {
    try {
      e.preventDefault();
      const { data } = await instance.post("/users/forget-password-token", {
        email,
      });
      const { data: status, msg } = data;
      setMsg(msg);
      if (status) {
        setTimeout(() => {
          navigate("/verify-password", { state: { email } });
        }, 2000);
      }
    } catch (err) {
      const errMsg =
        err?.response?.data?.msg || "Something went wrong. Try again!!";
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
            <h1 className="text-center">Forget Password</h1>
            {error && <Notify message={error} />}
            {msg && <Notify variant="success" message={msg} />}
            <form onSubmit={(e) => handleFP(e)}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Get Token
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

export default ForgetPassword;
