import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createApiClient } from '../api/axios'
import { createNote } from '../api/notesApi'
import { useAuth } from '../context/AuthContext'

export function useCreateNote() {
  const { token } = useAuth()
  const client = createApiClient(token)
  const queryClient = useQueryClient()

  return useMutation((note) => createNote(client, note), {
    onSuccess: () => queryClient.invalidateQueries(['notes'])
  })
}
