import apiClient from './apiClient';
import { dateToApiDate } from '../utils/common';

export const fetchBills = (month, year) => {
  return apiClient.get(`/manage/allbill?month=${month}&year=${year}`);
};

export const fetchRoomsWithoutBill = date => {
  return apiClient.get(`/manage/notexistsbill?date=${dateToApiDate(date)}`);
};

export const fetchBillSvInfo = (roomId, date) => {
  return apiClient.get(`manage/billservice?roomId=${roomId}&month=${dateToApiDate(date)}`);
};
