const jwt = require('jsonwebtoken');

function generateToken(payload) {
  const secret = process.env.JWT_SECRET;
  return jwt.sign(payload, secret, { expiresIn: '2h' });
}

module.exports = generateToken;
