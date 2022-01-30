import { fetchBillSvInfo } from '../../api/billing';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const getBillSvInfo = createAsyncThunk('billing/svInfo', async params => {
  const { roomId, date } = params;
  const data = await fetchBillSvInfo(roomId, date);
  // console.log(data);
  return data;
});

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
  },
});

export { getBillSvInfo };
export default billingSvSlide.reducer;
