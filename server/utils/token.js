const Crypto = require("crypto");
const JWT = require("jsonwebtoken");

const generateToken = (payload) =>
  JWT.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_DURATION }
  );

const verifyToken = (token) => JWT.verify(token, process.env.JWT_SECRET);

const checkRole = ({ sysRole, userRole }) =>
  sysRole.length === 0 ? true : userRole.some((role) => sysRole.includes(role));

const generateOtp = () => {
  return Crypto.randomInt(100000, 999999);
};

module.exports = { checkRole, generateToken, verifyToken, generateOtp };
