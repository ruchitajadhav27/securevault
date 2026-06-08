export function getNotes(client) {
  return client.get('/notes');
}

export function createNote(client, payload) {
  return client.post('/notes', payload);
}

export function deleteNote(client, noteId) {
  return client.delete(`/notes/${noteId}`);
}
