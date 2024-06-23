import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Notify } from "../components/Notify";

import { instance } from "../utils/axios";

import Logo from "../assets/logo.png";

const VerifyEmail = () => {
  const handleImageErr = (e) => {
    e.target.src = "https://pixlr.com/images/index/ai-image-generator-one.webp";
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
            <h1 className="text-center">Verify Email</h1>

            <form>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  disabled
                  value="raktim@rumsan.com"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Token</label>
                <input type="text" className="form-control" />
                <div className="form-text">Token is sent to email</div>
              </div>
              <button type="submit" className="btn btn-primary">
                Verify my account
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

export default VerifyEmail;
