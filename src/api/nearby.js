import apiClient from './apiClient';

const endpoint = '/posts/location';

export const fetchNearbyPosts = ({ radius, lat, lng }) => {
  return apiClient.get(`${endpoint}?distance=${radius}&page=1&latitude=${lat}&longitude=${lng}`);
};
