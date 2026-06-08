import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createApiClient } from '../api/axios';
import { deleteNote } from '../api/notesApi';
import { useAuth } from '../context/AuthContext';

export function useDeleteNote() {
  const { token } = useAuth();
  const client = createApiClient(token);
  const queryClient = useQueryClient();

  return useMutation((noteId) => deleteNote(client, noteId), {
    onMutate: async (noteId) => {
      await queryClient.cancelQueries(['notes']);
      const previous = queryClient.getQueryData(['notes']);
      queryClient.setQueryData(['notes'], (old = []) => old.filter((note) => note.id !== noteId));
      return { previous };
    },
    onError: (_err, _noteId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['notes'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['notes']);
    },
  });
}
