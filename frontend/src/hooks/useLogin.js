import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';

export function useLogin() {
  const { login } = useAuth();
  return useMutation(({ username, password }) => login(username, password));
}
