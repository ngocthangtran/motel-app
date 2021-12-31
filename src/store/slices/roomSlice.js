import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApartments } from '../../api/apartment';
import { createRoom as createRoomAPI } from '../../api/room';

const getRooms = createAsyncThunk('room/get', async params => {
  const { apartmentId } = params;
  const data = await fetchApartments();
});

const createRoom = createAsyncThunk('room/create', async ({ room }) => {
  await createRoomAPI(room);
  console.log('1');
});

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    rooms: [],
    loading: false,
    error: '',
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
      console.log(2);
    });
    builder.addCase(createRoom.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(3);
    });
  },
});

export { getRooms, createRoom };
export default roomSlice.reducer;
