import axios from 'axios';

export function createApiClient(token) {
  const client = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  return client;
}
