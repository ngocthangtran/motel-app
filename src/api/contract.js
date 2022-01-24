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

export const deleteContract = contractId => {
  return apiClient.delete(`${endpoint}/delete/${contractId}`);
};

export const fetchContractDetail = contractId => {
  return apiClient.get(`${endpoint}/${contractId}`);
};

export const terminateContract = contractId => {
  return apiClient.get(`${endpoint}/terminate/${contractId}`);
};
