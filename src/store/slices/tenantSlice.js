import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createTenant as createTenantAPI } from '../../api/tenant';

const createTenant = createAsyncThunk('tenant/create', async params => {
  const { tenant } = params;
  await createTenantAPI(tenant);
});

const tenantSlice = createSlice({
  name: 'tenant',
  initialState: {
    loading: false,
    error: null,
    tenants: [],
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
  },
});

export { createTenant };
export default tenantSlice.reducer;
