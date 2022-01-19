import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createTenant as createTenantAPI,
  fetchTenants,
  deleteTenant as deleteTenantAPI,
  fetchNoContract,
} from '../../api/tenant';

const createTenant = createAsyncThunk('tenant/create', async params => {
  const { tenant } = params;
  return await createTenantAPI(tenant);
});

const getTenants = createAsyncThunk('tenant/getAll', async (params, { RejectWithValue }) => {
  try {
    const data = await fetchTenants();
    return data;
  } catch (error) {
    return rejectWithValue({ error: error.response.data });
  }
});

const deleteTenant = createAsyncThunk('tenant/delete', async tenantId => {
  await deleteTenantAPI(tenantId);
});

const getNoContractTenants = createAsyncThunk('tenant/nocontract', async () => {
  const { data } = await fetchNoContract();
  return data;
});

const tenantSlice = createSlice({
  name: 'tenant',
  initialState: {
    loading: false,
    error: null,
    tenants: [],
    noContractTenants: [],
  },
  reducers: {
    uploadTenant: (state, action) => {
      if (action.payload.type === 'add') {
        state.tenants.push(action.payload.data);
        console.log(1)
      } else if (action.payload.type === 'remove') {
        console.log(2)
        state.tenants.splice(action.payload.index, 1);
      } else if (action.payload.type === "clear") {
        state.tenants.splice(0, state.tenants.length);
      }
    },
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
      state.tenants = []
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
    builder.addCase(getNoContractTenants.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getNoContractTenants.fulfilled, (state, action) => {
      state.noContractTenants = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getNoContractTenants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export { createTenant, getTenants, deleteTenant, getNoContractTenants };
export const { uploadTenant } = tenantSlice.actions;
export default tenantSlice.reducer;
