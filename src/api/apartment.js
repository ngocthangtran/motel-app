import apiClient from './apiClient';

const endPoint = '/building';

export const createApartment = async apartment => {
  return apiClient.post(`${endPoint}/create`, apartment);
};

export const fetchApartments = async () => {
  return apiClient.get(`${endPoint}`);
};


export const deleteApartmentApi = async params => {
  return apiClient.delete(`${endPoint}/delete/${params.buildingId}`, params);
}