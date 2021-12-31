import axios from 'axios';
import { API_BASE_URL } from '@env';
import authStorage from '../utils/authStorage';

console.log(API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

apiClient.interceptors.request.use(async config => {
  const token = await authStorage.getToken();
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => {
    if (response && response.data) return response.data;
    return response;
  },
  error => {
    // console.log(error.response);
    // console.log('api error');
    // console.log(error.message);
    // return Promise.reject(error.response);
    console.log('🚀 ~ file: apiClient.js ~ line 32 ~ error.response', error);
    console.log('🚀 ~ file: apiClient.js ~ line 32 ~ error.response', error.response);

    return Promise.reject(error);
  }
);

export default apiClient;
