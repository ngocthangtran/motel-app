import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createRoom as createRoomAPI, fetchRooms } from '../../api/room';

const getRooms = createAsyncThunk('room/get', async apartmentId => {
  const data = await fetchRooms(apartmentId);
  return data;
});

const createRoom = createAsyncThunk('room/create', async ({ room }) => {
  return await createRoomAPI(room);
});

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    rooms: [],
    loading: false,
    error: '',
  },
  reducers: {
    reloadRoom: (state, action) => {
      if (action.payload.type === 'add') {
        state.rooms.push(action.payload.data);
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getRooms.pending, (state, action) => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(getRooms.fulfilled, (state, action) => {
      state.rooms = action.payload;
      state.error = '';
      state.loading = false;
    });

    builder.addCase(getRooms.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createRoom.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(createRoom.fulfilled, state => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(createRoom.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export { getRooms, createRoom };
export const { reloadRoom } = roomSlice.actions
export default roomSlice.reducer;
