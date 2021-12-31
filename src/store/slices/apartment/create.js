import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApartment as createApartmentAPI } from '../../../api/apartment';

const createApartment = createAsyncThunk('apartment/create', async params => {
  const { apartment } = params;
  await createApartmentAPI(apartment);
});

const createApartmentSlice = createSlice({
  name: 'apartment/create',
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder.addCase(createApartment.pending, state => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createApartment.fulfilled, state => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(createApartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export { createApartment };
export default createApartmentSlice.reducer;
