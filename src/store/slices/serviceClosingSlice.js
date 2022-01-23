import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchRoomServices,
  fetchSVClosingRooms,
  closingService as closingServiceAPI,
  deleteClosedService as delClosedAPI,
} from '../../api/serviceClosing';

const getServiceClosingRooms = createAsyncThunk('serviceClosing/rooms', async () => {
  const data = await fetchSVClosingRooms();
  return data;
});

const getRoomServices = createAsyncThunk('serviceClosing/roomServices', async params => {
  const { roomId, month, year } = params;
  const data = await fetchRoomServices(roomId, month, year);
  return data;
});

const closingService = createAsyncThunk('serviceClosing/closing', async params => {
  await closingServiceAPI(params);
});

const deleteClosedService = createAsyncThunk('serviceClosing/delete', async params => {
  const { date, contractId } = params;
  await delClosedAPI({ date, contractId });
});

const serviceClosingSlice = createSlice({
  name: 'serviceClosing',
  initialState: {
    loading: false,
    error: null,
    rooms: null,
    roomServices: null,
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

    builder.addCase(getRoomServices.pending, state => {
      state.loading = true;
    });
    builder.addCase(getRoomServices.fulfilled, (state, action) => {
      state.loading = false;
      state.roomServices = action.payload;
    });
    builder.addCase(getRoomServices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(closingService.pending, state => {
      state.loading = true;
    });
    builder.addCase(closingService.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(closingService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteClosedService.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteClosedService.fulfilled, state => {
      console.log('ok');
      state.loading = false;
    });
    builder.addCase(deleteClosedService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export { getServiceClosingRooms, getRoomServices, closingService, deleteClosedService };
export default serviceClosingSlice.reducer;
