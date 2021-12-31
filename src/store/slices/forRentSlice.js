import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostsByType } from '../../api/post';

const fetchForRentPosts = createAsyncThunk('forRent/fetch', async (params, { getState }) => {
  const state = getState();
  const { postType } = params;
  const res = await getPostsByType(postType, state.forRent.page + 1);
  return res.data;
});

const forRentSlice = createSlice({
  name: 'forRent',
  initialState: {
    data: [],
    loading: false,
    page: 0,
    error: '',
    next: true,
  },
  extraReducers: builder => {
    builder.addCase(fetchForRentPosts.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchForRentPosts.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.length !== 0) {
        state.data = state.data.concat(action.payload);
        state.page += 1;
      } else {
        state.next = false;
      }
    });

    builder.addCase(fetchForRentPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
export { fetchForRentPosts };
export default forRentSlice.reducer;
