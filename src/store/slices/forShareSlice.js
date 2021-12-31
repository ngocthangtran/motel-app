import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostsByType } from '../../api/post';

const fetchForSharePosts = createAsyncThunk('forShare/fetch', async (params, { getState }) => {
  const state = getState();
  const { postType } = params;
  const res = await getPostsByType(postType, state.forShare.page + 1);
  return res.data;
});

const forShareSlice = createSlice({
  name: 'forShare',
  initialState: {
    data: [],
    loading: false,
    page: 0,
    error: '',
    next: true,
  },
  extraReducers: builder => {
    builder.addCase(fetchForSharePosts.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchForSharePosts.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.length !== 0) {
        state.data = state.data.concat(action.payload);
        state.page += 1;
      } else {
        state.next = false;
      }
    });

    builder.addCase(fetchForSharePosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
export { fetchForSharePosts };
export default forShareSlice.reducer;
