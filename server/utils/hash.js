const Bcrypt = require("bcryptjs");

const genHash = (payload) => {
  return Bcrypt.hashSync(payload, Number(process.env.SALT_ROUND));
};

const compareHash = (hashPayload, payload) => {
  return Bcrypt.compareSync(payload, hashPayload);
};

module.exports = { genHash, compareHash };
