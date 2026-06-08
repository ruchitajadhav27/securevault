const { registerSchema, loginSchema } = require('../validators/auth.validator');
const authService = require('../services/auth.service');
const generateToken = require('../utils/generateToken');

async function register(req, res, next) {
  try {
    const { username, password } = registerSchema.parse(req.body);
    const user = await authService.registerUser(username, password);
    res.json({ id: user.id, username: user.username });
  } catch (err) {
    if (err.errors) {
      return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') });
    }
    if (err.code === 'SQLITE_CONSTRAINT' || err.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = loginSchema.parse(req.body);
    const user = await authService.loginUser(username, password);
    const token = generateToken({ sub: user.id, username: user.username });
    return res.json({ token, encryptionKeyBase64: process.env.ENCRYPTION_KEY_BASE64 || '' });
  } catch (err) {
    if (err.errors) {
      return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') });
    }
    if (err.status) {
      return res.status(err.status).json({ error: err.message });
    }
    next(err);
  }
}

module.exports = {
  register,
  login,
};
