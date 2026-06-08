const bcrypt = require('bcrypt');
const User = require('../models/User');

const SALT_ROUNDS = 10;

async function registerUser(username, password) {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  return User.createUser(username, passwordHash);
}

async function loginUser(username, password) {
  const user = await User.findByUsername(username);
  if (!user) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }
  return user;
}

module.exports = {
  registerUser,
  loginUser,
};
