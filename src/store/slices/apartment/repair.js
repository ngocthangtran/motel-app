import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApartment as createApartmentAPI, repairApartmentApi } from '../../../api/apartment';

const repairApartment = createAsyncThunk('apartment/create', async params => {
    return await repairApartmentApi(params);
});

const repairApartmentSlice = createSlice({
    name: 'apartment/repair',
    initialState: {
        loading: false,
        error: null,
    },
    extraReducers: builder => {
        builder.addCase(repairApartment.pending, state => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(repairApartment.fulfilled, state => {
            state.loading = false;
            state.error = null;
        });

        builder.addCase(repairApartment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export { repairApartment };
export default repairApartmentSlice.reducer;
