import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBills, fetchRoomsWithoutBill, fetchBillSvInfo } from '../../api/billing';

const getBills = createAsyncThunk('billing/getBills', async params => {
  const { month, year } = params;
  const data = await fetchBills(month, year);
  return data;
});

const getRoomsWithoutBill = createAsyncThunk('billing/rooms', async date => {
  const data = await fetchRoomsWithoutBill(date);
  return data;
});

const getBillSvInfo = createAsyncThunk('billing/svInfo', async params => {
  const { roomId, date } = params;
  const data = await fetchBillSvInfo(roomId, date);
  return data;
});

const billingSlice = createSlice({
  name: 'billing',
  initialState: {
    bills: [],
    loading: false,
    error: null,
    rooms: null,
    billSvInfo: null,
  },
  extraReducers: builder => {
    builder.addCase(getBills.pending, state => {
      state.loading = true;
    });
    builder.addCase(getBills.fulfilled, (state, action) => {
      state.loading = false;
      state.bills = action.payload;
    });
    builder.addCase(getBills.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getRoomsWithoutBill.pending, state => {
      state.loading = true;
    });
    builder.addCase(getRoomsWithoutBill.fulfilled, (state, action) => {
      state.loading = false;
      state.rooms = action.payload;
    });
    builder.addCase(getRoomsWithoutBill.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getBillSvInfo.pending, state => {
      state.loading = true;
    });
    builder.addCase(getBillSvInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.billSvInfo = action.payload;
    });
    builder.addCase(getBillSvInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export { getBills, getRoomsWithoutBill, getBillSvInfo };
export default billingSlice.reducer;
