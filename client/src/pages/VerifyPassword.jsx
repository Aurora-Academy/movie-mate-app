import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Notify } from "../components/Notify";

import { instance } from "../utils/axios";

import Logo from "../assets/logo.png";

const VerifyPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [payload, setPayload] = useState({
    email: state?.email || "",
    otp: "",
    newPassword: "",
  });

  const handleImageErr = (e) => {
    e.target.src = "https://pixlr.com/images/index/ai-image-generator-one.webp";
  };

  const handleFPChange = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance.post("/users/forget-password", payload);
      const { data: status, msg } = data;
      setMsg(msg);
      if (status) {
        setTimeout(() => {
          navigate("/login", { replace: true });
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

  useEffect(() => {
    if (!state?.email) {
      navigate("/login", { replace: true });
    }
  }, [navigate, state?.email]);

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
            <h1 className="text-center">Verify Password</h1>
            {error && <Notify message={error} />}
            {msg && <Notify variant="success" message={msg} />}
            <form onSubmit={(e) => handleFPChange(e)}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  disabled
                  value={state?.email}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Token</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setPayload((prev) => {
                      return { ...prev, otp: e.target.value };
                    });
                  }}
                  minLength="6"
                  maxLength="6"
                  required
                />
                <div className="form-text">Token is sent to email</div>
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => {
                    setPayload((prev) => {
                      return { ...prev, newPassword: e.target.value };
                    });
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Reset Password
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

export default VerifyPassword;
