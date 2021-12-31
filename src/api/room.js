import apiClient from './apiClient';

const endPoint = '/room';

export const fetchRooms = async apartmentId => {
  return apiClient.get(`${endPoint}/?buildingId=${apartmentId}`);
};

export const createRoom = async room => {
  return apiClient.post(`${endPoint}/create`, room);
};
