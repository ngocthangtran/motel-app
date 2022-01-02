import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createTenant as createTenantAPI,
  fetchTenants,
  deleteTenant as deleteTenantAPI,
} from '../../api/tenant';

const createTenant = createAsyncThunk('tenant/create', async params => {
  const { tenant } = params;
  return await createTenantAPI(tenant);
});

const getTenants = createAsyncThunk('tenant/getAll', async () => {
  const data = await fetchTenants();
  return data;
});

const deleteTenant = createAsyncThunk('tenant/delete', async tenantId => {
  await deleteTenantAPI(tenantId);
});

const tenantSlice = createSlice({
  name: 'tenant',
  initialState: {
    loading: false,
    error: null,
    tenants: [],
  },
  reducers: {
    uploadTenant: (state, action) => {
      if (action.payload.type === "add") {
        state.tenants.push(action.payload.data)
      } else if (action.payload.type === "remove") {
        state.tenants.splice(action.payload.index, 1);
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(createTenant.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTenant.fulfilled, state => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createTenant.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getTenants.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTenants.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.tenants = action.payload;
    });
    builder.addCase(getTenants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteTenant.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(deleteTenant.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(deleteTenant.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export { createTenant, getTenants, deleteTenant };
export const { uploadTenant } = tenantSlice.actions
export default tenantSlice.reducer;
