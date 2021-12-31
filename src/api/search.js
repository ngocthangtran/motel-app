import apiClient from './apiClient';

const endpoint = '/posts/find';

export const searchPosts = ({
  keyword,
  postType,
  roomType,
  sort,
  maxArea,
  minArea,
  maxPrice,
  minPrice,
}) => {
  return apiClient.get(
    `${endpoint}${'?value=' + keyword}${postType ? '&postType=' + postType : ''}${
      roomType ? '&roomTypeId=' + roomType : ''
    }${sort ? '&sort=' + sort : ''}${minArea || minArea == 0 ? '&areaStart=' + minArea : ''}${
      maxArea ? '&areaEnd=' + maxArea : ''
    }${minPrice || minPrice == 0 ? '&priceStart=' + minPrice : ''}${
      maxPrice ? '&priceEnd=' + maxPrice : ''
    }`
  );
};
