const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const { deleteApartmentApi } = require('../../../api/apartment');

const deleteApartment = createAsyncThunk(
  'apartment/delete',
  async (params, { rejectWithValue }) => {
    try {
      const data = await deleteApartmentApi(params);
      return data;
    } catch (error) {
      return rejectWithValue({ error: error.response.data });
    }
  }
);

const deleteApartmentSlide = createSlice({
  name: 'apartment',
  initialState: {
    error: null,
    loading: false,
  },
  extraReducers: {
    [deleteApartment.pending]: state => {
      state.loading = true;
    },
    [deleteApartment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteApartment.fulfilled]: state => {
      state.loading = false;
    },
  },
});

export { deleteApartment };
export default deleteApartmentSlide.reducer;
