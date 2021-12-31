import apiClient from './apiClient';

const endpoint = '/auth';

export const login = (token, provider) => {
  return apiClient.post(endpoint, { token, provider });
};

export default { login };
