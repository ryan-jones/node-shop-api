const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  hashPassword, signToken, comparePwd
}

function hashPassword(req) {
  return bcrypt.hash(req.body.password, 10)
}

function comparePwd(input, hashed ) {
  return bcrypt.compare(input, hashed);
}

function signToken(properties) {
  return jwt.sign(properties, process.env.JWT_KEY, { expiresIn: "1h" })
}



