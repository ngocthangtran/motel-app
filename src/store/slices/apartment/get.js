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
export default getApartmentSlice.reducer;
