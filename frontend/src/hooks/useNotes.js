import { useQuery } from '@tanstack/react-query';
import { createApiClient } from '../api/axios';
import { getNotes } from '../api/notesApi';
import { useAuth } from '../context/AuthContext';

export function useNotes() {
  const { token } = useAuth();
  const client = createApiClient(token);

  return useQuery(['notes'], async () => {
    const response = await getNotes(client);
    return response.data.notes;
  }, {
    enabled: !!token,
  });
}
