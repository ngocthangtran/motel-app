import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchApartments, getApartmentApi } from '../../../api/apartment';

const getApartment = createAsyncThunk('apartment/get', async () => {
  const data = await fetchApartments();
  return data;
});

const getAnApatment = createAsyncThunk('apatment/getDetails', async params => {
  const { buildingId } = params;
  const data = await getApartmentApi(buildingId);
  return data;
})

const getApartmentSlice = createSlice({
  name: 'apartment/get',
  initialState: {
    apartments: [],
    apartmentDetails: null,
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

    builder.addCase(getAnApatment.pending, state => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getAnApatment.fulfilled, (state, action) => {
      state.apartmentDetails = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getAnApatment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export { getApartment, getAnApatment };
export const { reloadApartment } = getApartmentSlice.actions;
export default getApartmentSlice.reducer;
