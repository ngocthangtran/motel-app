const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { deleteApartmentApi } = require("../../../api/apartment");

const deleteApartment = createAsyncThunk('apartment/delete', async params => {
    const data = await deleteApartmentApi(params);
    return data
})

const deleteApartmentSlide = createSlice({
    name: "apartment",
    initialState: {
        error: null,
        loading: false
    },
    extraReducers: {
        [deleteApartment.pending]: state => {
            state.loading = true
        },
        [deleteApartment.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload;
        },
        [deleteApartment.fulfilled]: state => {
            state.loading = false;
        }
    }
})

export { deleteApartment };
export default deleteApartmentSlide.reducer;