import apiClient from './apiClient';

const endpoint = '/contract';

export const fetchContracts = () => {
  return apiClient.get(endpoint);
};

export const createContract = contract => {
  return apiClient.post(`${endpoint}/create`, contract);
};

export const editContract = contract => {
  return apiClient.post(`${endpoint}/repair`, contract);
};

export const deleteContract = contract => {
  return apiClient.delete(`${endpoint}/delete/${contract.contractId}`);
};
