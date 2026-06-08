import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';

export function useRegister() {
  const { register } = useAuth();
  return useMutation(({ username, password }) => register(username, password));
}
