import { deleteBill, fetchBillSvInfo, paidBill } from '../../api/billing';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const getBillSvInfo = createAsyncThunk('billing/svInfo', async params => {
  const { roomId, date } = params;
  const data = await fetchBillSvInfo(roomId, date);
  return data;
});

const deleteBillService = createAsyncThunk('billing/deleteBill', async params => {
  const { billId } = params;
  const data = await deleteBill(billId);
  return data
})

const paidBillService = createAsyncThunk('billing/paid', async params => {
  const { billId } = params;
  const data = await paidBill(billId);
  return data
})

const billingSvSlide = createSlice({
  name: 'billingSv',
  initialState: {
    billSvInfo: null,
    loading: false,
    error: null,
  },
  extraReducers: builder => {
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

    builder.addCase(deleteBillService.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteBillService.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteBillService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(paidBillService.pending, state => {
      state.loading = true;
    });
    builder.addCase(paidBillService.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(paidBillService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export { getBillSvInfo, deleteBillService, paidBillService };
export default billingSvSlide.reducer;
