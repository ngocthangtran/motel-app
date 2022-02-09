import apiClient from './apiClient';

const endpoint = '/posts';

export const getPosts = page => {
  return apiClient.get(`${endpoint}/${page}`);
};

export const getMainPosts = () => {
  return apiClient.get(`${endpoint}/main`);
};

export const createPost = post => {
  return apiClient.post(`${endpoint}/`, post);
};

export const reqairPostApi = (post, postId) => {
  return apiClient.post(`${endpoint}/repair/${postId}`, post)
}

export const getPostDetails = id => {
  return apiClient.get(`${endpoint}/viewpost/${id}`);
};

export const getPostsByType = (postType, page) => {
  return apiClient.get(`${endpoint}/type?postType=${postType}&page=${page}`);
};

export const likePost = postId => {
  return apiClient.get(`${endpoint}/liked?postId=${postId}`);
};

export const unlikePost = postId => {
  return apiClient.get(`${endpoint}/unliked?postId=${postId}`);
};

export const getLikedPosts = (page = 1) => {
  return apiClient.get(`${endpoint}/userliked?page=${page}`);
};

export const getPostedPosts = () => {
  return apiClient.get(`${endpoint}/user`);
};

export const deletePost = postId => {
  return apiClient.delete(`${endpoint}/delete/${postId}`);
};
