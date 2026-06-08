const db = require('../config/db');

function createUser(username, passwordHash) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO users (username, passwordHash) VALUES (?, ?)');
    stmt.run(username, passwordHash, function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, username });
    });
  });
}

function findByUsername(username) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

module.exports = {
  createUser,
  findByUsername,
  findById,
};
