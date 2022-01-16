import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSVClosingRooms } from '../../api/serviceClosing';

const getServiceClosingRooms = createAsyncThunk('serviceClosing/rooms', async () => {
  const data = await fetchSVClosingRooms();
  return data;
});

const serviceClosingSlice = createSlice({
  name: 'serviceClosing',
  initialState: {
    loading: false,
    error: null,
    rooms: null,
  },
  extraReducers: builder => {
    builder.addCase(getServiceClosingRooms.pending, state => {
      state.loading = true;
    });
    builder.addCase(getServiceClosingRooms.fulfilled, (state, action) => {
      state.loading = false;
      state.rooms = action.payload;
    });
    builder.addCase(getServiceClosingRooms.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export { getServiceClosingRooms };
export default serviceClosingSlice.reducer;
