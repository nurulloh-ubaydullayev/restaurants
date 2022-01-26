const { verify, sign } = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";

const signUser = payload => sign(payload, SECRET_KEY);
const verifyUser = payload => {
  try {
    return verify(payload, SECRET_KEY);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  signUser,
  verifyUser,
};
