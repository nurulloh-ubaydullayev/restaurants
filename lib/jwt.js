const { verify, sign } = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";

const signUser = payload => sign(payload, SECRET_KEY);
const verifyUser = payload => verify(payload, SECRET_KEY);

module.exports = {
  signUser,
  verifyUser,
};
