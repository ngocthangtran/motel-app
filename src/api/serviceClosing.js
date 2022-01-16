import apiClient from './apiClient';

export const fetchSVClosingRooms = params => {
  const curDate = new Date();
  return apiClient.get(
    `manage/contract/effective?month=${curDate.getMonth() + 1}&year=${curDate.getFullYear()}`
  );
};
