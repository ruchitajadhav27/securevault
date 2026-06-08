const db = require('../config/db');

function createNote(userId, title, encryptedContent, iv, authTag, createdAt) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      'INSERT INTO notes (userId, title, encryptedContent, iv, authTag, createdAt) VALUES (?, ?, ?, ?, ?, ?)'
    );
    stmt.run(userId, title, encryptedContent, iv, authTag, createdAt, function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, userId, title, encryptedContent, iv, authTag, createdAt });
    });
  });
}

function findByUserId(userId) {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT id, userId, title, encryptedContent, iv, authTag, createdAt FROM notes WHERE userId = ? ORDER BY createdAt DESC',
      [userId],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM notes WHERE id = ?', [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function deleteById(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM notes WHERE id = ?', [id], function (err) {
      if (err) return reject(err);
      resolve(this.changes);
    });
  });
}

module.exports = {
  createNote,
  findByUserId,
  findById,
  deleteById,
};
