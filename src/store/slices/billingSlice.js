import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchBills,
  fetchRoomsWithoutBill,
  createBill as createBillAPI,
  fetchBillDetails,
} from '../../api/billing';

const getBills = createAsyncThunk('billing/getBills', async params => {
  const { month, year } = params;
  const data = await fetchBills(month, year);
  return data;
});

const getRoomsWithoutBill = createAsyncThunk('billing/rooms', async date => {
  const data = await fetchRoomsWithoutBill(date);
  return data;
});

const createBill = createAsyncThunk('billing/create', async bill => {
  const res = await createBillAPI(bill);
  return res;
});

const getBillDetails = createAsyncThunk('billing/details', async billId => {
  const billDetails = await fetchBillDetails(billId);
  return billDetails;
});

const billingSlice = createSlice({
  name: 'billing',
  initialState: {
    bills: [],
    loading: false,
    error: null,
    rooms: null,
    billDetails: null,
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
      state.rooms = action.payload;
      state.loading = false;
    });
    builder.addCase(getRoomsWithoutBill.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createBill.pending, state => {
      state.loading = true;
    });
    builder.addCase(createBill.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createBill.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getBillDetails.pending, state => {
      state.loading = true;
    });
    builder.addCase(getBillDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.billDetails = action.payload;
    });
    builder.addCase(getBillDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export { getBills, getRoomsWithoutBill, createBill, getBillDetails };
export default billingSlice.reducer;
