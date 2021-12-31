import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { create } from 'yup/lib/Reference';
import {
  createService as createServiceAPI,
  fetchServices,
  updateService as updateServiceAPI,
  deleteService as deleteServiceAPI,
  getApartmentServices as getApartmentServicesAPI,
} from '../../api/serviceApi';

const createService = createAsyncThunk('service/create', async params => {
  const { service } = params;
  await createServiceAPI(service);
});

const getServices = createAsyncThunk('service/getServices', async () => {
  const data = await fetchServices();
  return data;
});

const updateService = createAsyncThunk('service/update', async params => {
  const { service } = params;
  await updateServiceAPI(service);
  return service;
});

const getApartmentServices = createAsyncThunk('service/apServices', async params => {
  const { apartmentId } = params;
  const data = await getApartmentServicesAPI(apartmentId);
  return data;
});

const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    apServices: [],
    services: [],
    loading: false,
    error: '',
  },
  extraReducers: builder => {
    builder.addCase(createService.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(createService.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
    });

    builder.addCase(createService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getServices.pending, state => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(getServices.fulfilled, (state, action) => {
      state.services = action.payload;
      state.error = '';
      state.loading = false;
    });

    builder.addCase(getServices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //update
    builder.addCase(updateService.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(updateService.fulfilled, (state, action) => {
      const us = action.payload;
      const index = state.services.findIndex(i => i.serviceId === us.serviceId);
      state.services[index] = { ...state.services[index], ...us };
      state.loading = false;
      state.error = '';
    });
    builder.addCase(updateService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getApartmentServices.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getApartmentServices.fulfilled, (state, action) => {
      state.apServices = action.payload;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(getApartmentServices.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export { createService, getServices, updateService, getApartmentServices };
export default serviceSlice.reducer;
