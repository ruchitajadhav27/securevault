const Note = require('../models/Note');

async function getNotesForUser(userId) {
  return Note.findByUserId(userId);
}

async function createNoteForUser(userId, title, encryptedContent, iv, authTag) {
  const createdAt = new Date().toISOString();
  return Note.createNote(userId, title || null, encryptedContent, iv, authTag, createdAt);
}

async function deleteNoteForUser(noteId, userId) {
  const note = await Note.findById(noteId);
  if (!note) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  if (note.userId !== userId) {
    const error = new Error('Forbidden');
    error.status = 403;
    throw error;
  }
  await Note.deleteById(noteId);
  return true;
}

module.exports = {
  getNotesForUser,
  createNoteForUser,
  deleteNoteForUser,
};
