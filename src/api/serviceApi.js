import apiClient from './apiClient';

const endPoint = '/service';

export const createService = service => {
  return apiClient.post(`${endPoint}/create`, service);
};

export const fetchServices = () => {
  return apiClient.get(`${endPoint}/user`);
};

export const updateService = service => {
  return apiClient.post(`${endPoint}/repair`, service);
};

export const deleteService = serviceId => {
  return apiClient.delete(`${endPoint}/delete/${serviceId}`);
};

export const getApartmentServices = async apartmentId => {
  return apiClient.get(`${endPoint}/building/${apartmentId}`);
};
