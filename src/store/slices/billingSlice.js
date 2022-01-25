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



const billingSlice = createSlice({
  name: 'billing',
  initialState: {
    bills: [],
    loading: false,
    error: null,
    rooms: null,
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

  },
});
export { getBills, getRoomsWithoutBill };
export default billingSlice.reducer;
