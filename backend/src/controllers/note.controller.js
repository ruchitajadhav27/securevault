const { noteCreateSchema } = require('../validators/note.validator');
const noteService = require('../services/note.service');
const encryptionService = require('../services/encryption.service');

async function listNotes(req, res, next) {
  try {
    const userId = req.user.id;
    const notes = await noteService.getNotesForUser(userId);
    const decryptedNotes = notes.map((note) => {
      try {
        return {
          id: note.id,
          title: note.title || null,
          content: encryptionService.decryptNote(note),
          createdAt: note.createdAt,
        };
      } catch (err) {
        return {
          id: note.id,
          title: note.title || null,
          content: null,
          createdAt: note.createdAt,
          error: 'Decryption failed',
        };
      }
    });
    res.json({ notes: decryptedNotes });
  } catch (err) {
    next(err);
  }
}

async function createNote(req, res, next) {
  try {
    const data = noteCreateSchema.parse(req.body);
    const userId = req.user.id;
    const note = await noteService.createNoteForUser(userId, data.title, data.encryptedContent, data.iv, data.authTag);
    res.json({ id: note.id, createdAt: note.createdAt });
  } catch (err) {
    if (err.errors) {
      return res.status(400).json({ error: err.errors.map((e) => e.message).join(', ') });
    }
    next(err);
  }
}

async function deleteNote(req, res, next) {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;
    await noteService.deleteNoteForUser(noteId, userId);
    res.json({ success: true });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({ error: err.message });
    }
    next(err);
  }
}

module.exports = {
  listNotes,
  createNote,
  deleteNote,
};
