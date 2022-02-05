import apiClient from './apiClient';
import { dateToApiDate } from '../utils/common';

export const fetchBills = (month, year) => {
  return apiClient.get(`/manage/allbill?month=${month}&year=${year}`);
};

export const fetchBillDetails = billId => {
  return apiClient.get(`/manage/detailsbill/${billId}`);
};

export const fetchRoomsWithoutBill = date => {
  return apiClient.get(`/manage/notexistsbill?date=${dateToApiDate(date)}`);
};

export const fetchBillSvInfo = (roomId, date) => {
  return apiClient.get(`manage/billservice?roomId=${roomId}&month=${dateToApiDate(date)}`);
};

export const createBill = bill => {
  return apiClient.post('/manage/createbill', bill);
};

export const deleteBill = billId => {
  return apiClient.delete(`/manage/deletebill?billId=${billId}`);
}

export const paidBill = billId => {
  return apiClient.patch(`manage/paybill?billId=${billId}`);
}