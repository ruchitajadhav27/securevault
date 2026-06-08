const express = require('express');
const noteController = require('../controllers/note.controller');

const router = express.Router();

router.get('/', noteController.listNotes);
router.post('/', noteController.createNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
