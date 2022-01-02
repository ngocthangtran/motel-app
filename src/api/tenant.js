import apiClient from './apiClient';

const endpoint = '/renter';

export const fetchTenants = () => {
  return apiClient.get(endpoint);
};

export const createTenant = tenant => {
  return apiClient.post(`${endpoint}/create`, tenant);
};

export const editTenant = tenant => {
  return apiClient.post(`${endpoint}/repair`, tenant);
};

export const deleteTenant = tenantId => {
  return apiClient.delete(`${endpoint}/delete/${tenantId}`);
};
