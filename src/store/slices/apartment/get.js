import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchApartments } from '../../../api/apartment';

const getApartment = createAsyncThunk('apartment/get', async () => {
  const data = await fetchApartments();
  return data;
});

const getApartmentSlice = createSlice({
  name: 'apartment/get',
  initialState: {
    apartments: [],
    loading: false,
    error: null,
  },
  reducers: {
    reloadApartment: (state, action) => {
      if (action.payload.type === 'add') {
        state.apartments.push(action.payload.data);
      } else if (action.payload.type === 'remove') {
        state.apartments.splice(action.payload.index, 1)
      }

    }
  },
  extraReducers: builder => {
    builder.addCase(getApartment.pending, state => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getApartment.fulfilled, (state, action) => {
      state.apartments = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getApartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export { getApartment };
export const { reloadApartment } = getApartmentSlice.actions;
export default getApartmentSlice.reducer;
