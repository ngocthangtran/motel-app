import apiClient from './apiClient';

export const fetchSVClosingRooms = params => {
  const curDate = new Date();
  return apiClient.get(
    `manage/contract/effective?month=${curDate.getMonth() + 1}&year=${curDate.getFullYear()}`
  );
};

export const fetchRoomServices = (roomId, month, date) => {
  return apiClient.get(`manage/roomservice?roomId=${roomId}&month=${month}&year=${date}`);
};

export const closingService = closingData => {
  return apiClient.post('/manage/singleclosing/', closingData);
};

export const deleteClosedService = ({ date, contractId }) => {
  return apiClient.delete('/manage/deleteclosing', { date, contractId });
};
